/**
 * GET /api/sku-keyword-final-approvals/live-single-test-approval-audits
 *
 * Read-only API for retrieving live single test approval audit history.
 *
 * Modes:
 *   - batchJobId provided: returns audit history for that specific BatchJob
 *   - batchJobId absent: returns dashboard list of recent BatchJobs with audit records
 *
 * Safety invariants (always enforced):
 *   - GET only — no POST/PUT/PATCH/DELETE
 *   - naverApiCallAllowed is ALWAYS false
 *   - liveExecutionEnabled is ALWAYS false
 *   - operatingDbWriteAllowed is ALWAYS false
 *   - queueAllowed is ALWAYS false
 *   - workerAllowed is ALWAYS false
 *   - No Naver API calls, No Queue, No Worker, No DB writes
 *   - DATABASE_URL / REDIS_URL / secret / token never included in response
 *   - Maximum state: LIVE_APPROVAL_AUDIT_DASHBOARD_READ_ONLY_READY
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {
  buildLiveSingleTestAuditHistoryItem,
  extractSafeLiveSingleTestAuditHistory,
} from '@/src/services/sku-keyword-final-approval-execution-live-single-test-audit-history.service';
import {
  evaluateLiveSingleTestAuditDashboardReadiness,
} from '@/src/services/sku-keyword-final-approval-execution-live-single-test-audit-dashboard.service';
import {
  evaluateExecutionEnvironmentSafetyGuard,
} from '@/src/services/sku-keyword-final-approval-execution-environment-safety-guard.service';

function getDatabaseUrlSafeHint(): string | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  const lower = url.toLowerCase();
  if (lower.includes('localhost') || lower.includes('127.0.0.1') || lower.includes('::1')) return 'local_host';
  if (lower.includes('test') || lower.includes('dev') || lower.includes('staging')) return 'test_or_dev';
  if (lower.includes('prod') || lower.includes('production') || lower.includes('operating') || lower.includes('live')) return 'possible_prod';
  return 'unknown_host';
}

function getRedisUrlSafeHint(): string | null {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  const lower = url.toLowerCase();
  if (lower.includes('localhost') || lower.includes('127.0.0.1')) return 'local_host';
  if (lower.includes('test') || lower.includes('dev') || lower.includes('staging')) return 'test_or_dev';
  if (lower.includes('prod') || lower.includes('production') || lower.includes('operating')) return 'possible_prod';
  return 'unknown_host';
}

const SAFE_ENV_FIELDS = {
  naverApiCallAllowed: false as const,
  operatingDbWriteAllowed: false as const,
  queueAllowed: false as const,
  workerAllowed: false as const,
  sanitized: true as const,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const batchJobId = searchParams.get('batchJobId');
  const finalApprovalId = searchParams.get('finalApprovalId');
  const limitParam = searchParams.get('limit');

  // Environment safety (read-only, no DB writes)
  const envSafety = evaluateExecutionEnvironmentSafetyGuard({
    nodeEnv: process.env.NODE_ENV ?? null,
    databaseUrlPresent: !!process.env.DATABASE_URL,
    databaseUrlSafeHint: getDatabaseUrlSafeHint(),
    redisUrlPresent: !!process.env.REDIS_URL,
    redisUrlSafeHint: getRedisUrlSafeHint(),
    requestedAction: 'audit-dashboard-read-only',
  });

  const safeEnvSummary = {
    allowed: envSafety.allowed,
    environmentCode: envSafety.environmentCode,
    databaseEnvironment: envSafety.databaseEnvironment,
    redisEnvironment: envSafety.redisEnvironment,
    ...SAFE_ENV_FIELDS,
  };

  // ── Mode A: single BatchJob history ────────────────────────────────────────
  if (batchJobId) {
    const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 10, 1), 50) : 10;
    try {
      const job = await prisma.naverApiBatchJob.findUnique({
        where: { id: batchJobId },
        select: {
          id: true,
          status: true,
          metadata: true,
          finalApprovals: {
            where: finalApprovalId ? { id: finalApprovalId } : {},
            orderBy: { createdAt: 'desc' },
            take: limit,
            select: { id: true, status: true },
          },
        },
      });

      if (!job) {
        return NextResponse.json(
          {
            ok: false,
            error: 'BatchJob not found.',
            mode: 'READ_ONLY_AUDIT_HISTORY',
            naverApiCallAllowed: false,
            liveExecutionEnabled: false,
            operatingDbWriteAllowed: false,
            queueAllowed: false,
            workerAllowed: false,
          },
          { status: 404 }
        );
      }

      const historyResult = buildLiveSingleTestAuditHistoryItem({
        batchJobId: job.id,
        finalApprovalId: finalApprovalId ?? null,
        jobStatus: String(job.status),
        metadata: job.metadata,
      });

      return NextResponse.json({
        ok: true,
        mode: 'READ_ONLY_AUDIT_HISTORY',
        maxAllowedState: 'LIVE_APPROVAL_AUDIT_HISTORY_VISIBLE_BUT_NOT_EXECUTABLE',
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
        operatingDbWriteAllowed: false,
        queueAllowed: false,
        workerAllowed: false,
        batchJobId: job.id,
        batchJobStatus: String(job.status),
        exists: historyResult.exists,
        items: historyResult.items,
        latestAudit: historyResult.latestAudit,
        summary: historyResult.summary,
        blockingReasons: historyResult.blockingReasons,
        warnings: historyResult.warnings,
        sanitized: true,
        environmentSafety: safeEnvSummary,
      });
    } catch (err: unknown) {
      return NextResponse.json(
        {
          ok: false,
          error: err instanceof Error ? err.message : 'Internal server error',
          mode: 'READ_ONLY_AUDIT_HISTORY',
          naverApiCallAllowed: false,
          liveExecutionEnabled: false,
          operatingDbWriteAllowed: false,
          queueAllowed: false,
          workerAllowed: false,
        },
        { status: 500 }
      );
    }
  }

  // ── Mode B: dashboard list (no batchJobId) ──────────────────────────────────
  const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 50, 1), 100) : 50;

  try {
    // Fetch recent BatchJobs and filter those with liveSingleTestApprovalAudit in metadata.
    // We scan recent jobs (limit * 3 heuristic) and filter in service layer.
    const candidateJobs = await prisma.naverApiBatchJob.findMany({
      orderBy: { updatedAt: 'desc' },
      take: limit * 3,
      select: {
        id: true,
        status: true,
        updatedAt: true,
        metadata: true,
      },
    });

    // Collect audit history items from jobs that have audit records
    const allAuditItems = candidateJobs.flatMap(job => {
      const items = extractSafeLiveSingleTestAuditHistory(job.metadata, job.id);
      return items.map(item => ({
        ...item,
        // Include batchJobStatus for display
        _batchJobStatus: String(job.status),
        _updatedAt: job.updatedAt.toISOString(),
      }));
    });

    const dashboardResult = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: allAuditItems,
      limit,
    });

    return NextResponse.json({
      ok: true,
      mode: 'READ_ONLY_AUDIT_DASHBOARD',
      maxAllowedState: 'LIVE_APPROVAL_AUDIT_DASHBOARD_READ_ONLY_READY',
      naverApiCallAllowed: false,
      liveExecutionEnabled: false,
      operatingDbWriteAllowed: false,
      queueAllowed: false,
      workerAllowed: false,
      items: dashboardResult.items,
      summary: dashboardResult.summary,
      blockingReasons: dashboardResult.blockingReasons,
      warnings: dashboardResult.warnings,
      sanitized: true,
      environmentSafety: safeEnvSummary,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : 'Internal server error',
        mode: 'READ_ONLY_AUDIT_DASHBOARD',
        naverApiCallAllowed: false,
        liveExecutionEnabled: false,
        operatingDbWriteAllowed: false,
        queueAllowed: false,
        workerAllowed: false,
      },
      { status: 500 }
    );
  }
}
