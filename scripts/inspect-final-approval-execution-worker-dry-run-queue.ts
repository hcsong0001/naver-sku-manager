import Redis from 'ioredis';
import { Queue } from 'bullmq';

async function run() {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    console.error('[Error] REDIS_URL missing');
    process.exit(1);
  }

  const parsedUrl = new URL(redisUrl);
  if ((parsedUrl.hostname !== 'localhost' && parsedUrl.hostname !== '127.0.0.1') || parsedUrl.port !== '56379') {
    console.error('[Error] Invalid REDIS_URL for dry run inspection. Must be localhost:56379');
    process.exit(1);
  }

  const connection = new Redis(redisUrl, {
    maxRetriesPerRequest: null,
  });

  const queueName = process.env.FINAL_APPROVAL_EXECUTION_QUEUE_NAME || 'final-approval-execution';
  // @ts-expect-error ioredis version mismatch
  const queue = new Queue(queueName, { connection });

  try {
    const counts = await queue.getJobCounts();
    console.log(`[Inspection] REDIS_URL presence: true`);
    console.log(`[Inspection] queue name: ${queueName}`);
    console.log(`[Inspection] waiting count: ${counts.waiting}`);
    console.log(`[Inspection] active count: ${counts.active}`);
    console.log(`[Inspection] completed count: ${counts.completed}`);
    console.log(`[Inspection] failed count: ${counts.failed}`);
    console.log(`[Inspection] delayed count: ${counts.delayed}`);

    const targetJobId = 'final-approval-worker-limited-dry-run-evidence-001';
    const job = await queue.getJob(targetJobId);

    if (job) {
      console.log(`[Inspection] target job exists: true`);
      const state = await job.getState();
      console.log(`[Inspection] target job state: ${state}`);
      console.log(`[Inspection] target job name: ${job.name}`);
      console.log(`[Inspection] target job attemptsMade: ${job.attemptsMade}`);
      if (job.failedReason) {
        // Redact potential secrets in failed reason just in case
        const safeReason = job.failedReason.replace(/secret|token|password/gi, '***');
        console.log(`[Inspection] target job failedReason: ${safeReason}`);
      }
      if (job.data) {
        const fields = Object.keys(job.data);
        console.log(`[Inspection] target job data field presence: ${fields.join(', ')}`);
        console.log(`[Inspection] target job mode: ${job.data.mode}`);
        console.log(`[Inspection] target job source: ${job.data.source}`);
        console.log(`[Inspection] target job finalApprovalId: ${job.data.finalApprovalId}`);
      }
    } else {
      console.log(`[Inspection] target job exists: false`);
    }
  } catch (err) {
    console.error('[Inspection Error]', err);
  } finally {
    await queue.close();
    connection.disconnect();
  }
}

run().catch(() => process.exit(1));
