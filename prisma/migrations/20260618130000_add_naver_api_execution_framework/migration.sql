-- CreateEnum
CREATE TYPE "NaverApiCallStatus" AS ENUM ('PENDING', 'DRY_RUN', 'SUCCESS', 'PARTIAL_SUCCESS', 'FAILED', 'RETRY_PENDING', 'SKIPPED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "NaverApiBatchJobStatus" AS ENUM ('DRAFT', 'PREVIEW', 'APPROVAL_PENDING', 'APPROVED', 'EXECUTING', 'PARTIAL_SUCCESS', 'EXECUTED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "NaverApiBatchItemStatus" AS ENUM ('DRAFT', 'PREVIEWED', 'READY', 'EXECUTING', 'SUCCESS', 'FAILED', 'SKIPPED', 'RETRY_PENDING', 'CANCELLED');

-- CreateTable
CREATE TABLE "NaverApiBatchJob" (
    "id" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "status" "NaverApiBatchJobStatus" NOT NULL DEFAULT 'DRAFT',
    "dryRun" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "totalItems" INTEGER NOT NULL DEFAULT 0,
    "successItems" INTEGER NOT NULL DEFAULT 0,
    "failedItems" INTEGER NOT NULL DEFAULT 0,
    "skippedItems" INTEGER NOT NULL DEFAULT 0,
    "previewSummary" JSONB,
    "metadata" JSONB,
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "approvedAt" TIMESTAMP(3),
    "executedAt" TIMESTAMP(3),

    CONSTRAINT "NaverApiBatchJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NaverApiBatchJobItem" (
    "id" TEXT NOT NULL,
    "batchJobId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "channelId" TEXT,
    "productNo" TEXT,
    "channelProductNo" TEXT,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "internalSkuCode" TEXT,
    "legacyStockCode" TEXT,
    "barcode" TEXT,
    "skuLookupKeys" JSONB,
    "calculationType" TEXT NOT NULL DEFAULT 'SINGLE',
    "bundleComponents" JSONB,
    "calculatedCost" DECIMAL(12,2),
    "calculatedStock" INTEGER,
    "previewBefore" JSONB,
    "previewAfter" JSONB,
    "requestPayload" JSONB,
    "responsePayload" JSONB,
    "status" "NaverApiBatchItemStatus" NOT NULL DEFAULT 'DRAFT',
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "errorCode" TEXT,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NaverApiBatchJobItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NaverApiCallLog" (
    "id" TEXT NOT NULL,
    "smartstoreId" TEXT NOT NULL,
    "channelId" TEXT,
    "batchJobItemId" TEXT,
    "module" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "requestPayload" JSONB,
    "responsePayload" JSONB,
    "statusCode" INTEGER,
    "status" "NaverApiCallStatus" NOT NULL DEFAULT 'PENDING',
    "errorType" TEXT,
    "errorCode" TEXT,
    "errorMessage" TEXT,
    "attempt" INTEGER NOT NULL DEFAULT 1,
    "maxAttempts" INTEGER NOT NULL DEFAULT 1,
    "retryAfterMs" INTEGER,
    "idempotencyKey" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "durationMs" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NaverApiCallLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NaverApiBatchJob_jobType_idx" ON "NaverApiBatchJob"("jobType");
CREATE INDEX "NaverApiBatchJob_module_idx" ON "NaverApiBatchJob"("module");
CREATE INDEX "NaverApiBatchJob_status_idx" ON "NaverApiBatchJob"("status");
CREATE INDEX "NaverApiBatchJob_createdAt_idx" ON "NaverApiBatchJob"("createdAt");
CREATE INDEX "NaverApiBatchJobItem_batchJobId_idx" ON "NaverApiBatchJobItem"("batchJobId");
CREATE INDEX "NaverApiBatchJobItem_storeId_channelProductNo_idx" ON "NaverApiBatchJobItem"("storeId", "channelProductNo");
CREATE INDEX "NaverApiBatchJobItem_channelId_idx" ON "NaverApiBatchJobItem"("channelId");
CREATE INDEX "NaverApiBatchJobItem_targetType_targetId_idx" ON "NaverApiBatchJobItem"("targetType", "targetId");
CREATE INDEX "NaverApiBatchJobItem_operation_idx" ON "NaverApiBatchJobItem"("operation");
CREATE INDEX "NaverApiBatchJobItem_status_idx" ON "NaverApiBatchJobItem"("status");
CREATE INDEX "NaverApiBatchJobItem_internalSkuCode_idx" ON "NaverApiBatchJobItem"("internalSkuCode");
CREATE INDEX "NaverApiBatchJobItem_legacyStockCode_idx" ON "NaverApiBatchJobItem"("legacyStockCode");
CREATE INDEX "NaverApiBatchJobItem_barcode_idx" ON "NaverApiBatchJobItem"("barcode");
CREATE INDEX "NaverApiCallLog_smartstoreId_startedAt_idx" ON "NaverApiCallLog"("smartstoreId", "startedAt");
CREATE INDEX "NaverApiCallLog_channelId_idx" ON "NaverApiCallLog"("channelId");
CREATE INDEX "NaverApiCallLog_module_operation_idx" ON "NaverApiCallLog"("module", "operation");
CREATE INDEX "NaverApiCallLog_status_idx" ON "NaverApiCallLog"("status");
CREATE INDEX "NaverApiCallLog_batchJobItemId_idx" ON "NaverApiCallLog"("batchJobItemId");
CREATE INDEX "NaverApiCallLog_idempotencyKey_idx" ON "NaverApiCallLog"("idempotencyKey");

-- AddForeignKey
ALTER TABLE "NaverApiBatchJobItem" ADD CONSTRAINT "NaverApiBatchJobItem_batchJobId_fkey" FOREIGN KEY ("batchJobId") REFERENCES "NaverApiBatchJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "NaverApiBatchJobItem" ADD CONSTRAINT "NaverApiBatchJobItem_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Smartstore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "NaverApiCallLog" ADD CONSTRAINT "NaverApiCallLog_smartstoreId_fkey" FOREIGN KEY ("smartstoreId") REFERENCES "Smartstore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "NaverApiCallLog" ADD CONSTRAINT "NaverApiCallLog_batchJobItemId_fkey" FOREIGN KEY ("batchJobItemId") REFERENCES "NaverApiBatchJobItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
