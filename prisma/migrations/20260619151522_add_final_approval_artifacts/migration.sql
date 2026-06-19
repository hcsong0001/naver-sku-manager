-- CreateEnum
CREATE TYPE "NaverApiBatchFinalApprovalStatus" AS ENUM ('ACTIVE', 'INVALIDATED', 'SUPERSEDED');

-- CreateTable
CREATE TABLE "NaverApiBatchFinalApproval" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "status" "NaverApiBatchFinalApprovalStatus" NOT NULL DEFAULT 'ACTIVE',
    "finalApprovedAt" TIMESTAMP(3) NOT NULL,
    "finalApprovedBy" TEXT NOT NULL,
    "finalApprovalMemo" TEXT,
    "approvalSource" TEXT NOT NULL,
    "validationSnapshot" JSONB NOT NULL,
    "validationSnapshotHash" VARCHAR(64) NOT NULL,
    "validationExpiresAt" TIMESTAMP(3) NOT NULL,
    "payloadHash" VARCHAR(64) NOT NULL,
    "executionScope" JSONB NOT NULL,
    "hashSpec" JSONB NOT NULL,
    "invalidatedAt" TIMESTAMP(3),
    "invalidatedBy" TEXT,
    "invalidationReason" TEXT,
    "supersedesApprovalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NaverApiBatchFinalApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NaverApiBatchFinalApprovalItem" (
    "id" TEXT NOT NULL,
    "finalApprovalId" TEXT NOT NULL,
    "jobItemId" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "included" BOOLEAN NOT NULL,
    "excludedReason" TEXT,
    "itemPayloadHash" VARCHAR(64) NOT NULL,
    "itemValidationHash" VARCHAR(64) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NaverApiBatchFinalApprovalItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NaverApiBatchFinalApproval_jobId_status_idx" ON "NaverApiBatchFinalApproval"("jobId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "NaverApiBatchFinalApproval_one_active_per_job"
ON "NaverApiBatchFinalApproval"("jobId")
WHERE "status" = 'ACTIVE';

-- CreateIndex
CREATE INDEX "NaverApiBatchFinalApproval_status_idx" ON "NaverApiBatchFinalApproval"("status");

-- CreateIndex
CREATE INDEX "NaverApiBatchFinalApproval_supersedesApprovalId_idx" ON "NaverApiBatchFinalApproval"("supersedesApprovalId");

-- CreateIndex
CREATE INDEX "NaverApiBatchFinalApproval_finalApprovedAt_idx" ON "NaverApiBatchFinalApproval"("finalApprovedAt");

-- CreateIndex
CREATE INDEX "NaverApiBatchFinalApproval_validationExpiresAt_idx" ON "NaverApiBatchFinalApproval"("validationExpiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "NaverApiBatchFinalApproval_jobId_version_key" ON "NaverApiBatchFinalApproval"("jobId", "version");

-- CreateIndex
CREATE INDEX "NaverApiBatchFinalApprovalItem_finalApprovalId_included_idx" ON "NaverApiBatchFinalApprovalItem"("finalApprovalId", "included");

-- CreateIndex
CREATE INDEX "NaverApiBatchFinalApprovalItem_jobItemId_idx" ON "NaverApiBatchFinalApprovalItem"("jobItemId");

-- CreateIndex
CREATE INDEX "NaverApiBatchFinalApprovalItem_storeId_targetType_targetId_idx" ON "NaverApiBatchFinalApprovalItem"("storeId", "targetType", "targetId");

-- CreateIndex
CREATE UNIQUE INDEX "NaverApiBatchFinalApprovalItem_finalApprovalId_jobItemId_key" ON "NaverApiBatchFinalApprovalItem"("finalApprovalId", "jobItemId");

-- AddForeignKey
ALTER TABLE "NaverApiBatchFinalApproval" ADD CONSTRAINT "NaverApiBatchFinalApproval_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "NaverApiBatchJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NaverApiBatchFinalApproval" ADD CONSTRAINT "NaverApiBatchFinalApproval_supersedesApprovalId_fkey" FOREIGN KEY ("supersedesApprovalId") REFERENCES "NaverApiBatchFinalApproval"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NaverApiBatchFinalApprovalItem" ADD CONSTRAINT "NaverApiBatchFinalApprovalItem_finalApprovalId_fkey" FOREIGN KEY ("finalApprovalId") REFERENCES "NaverApiBatchFinalApproval"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NaverApiBatchFinalApprovalItem" ADD CONSTRAINT "NaverApiBatchFinalApprovalItem_jobItemId_fkey" FOREIGN KEY ("jobItemId") REFERENCES "NaverApiBatchJobItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
