-- CreateEnum
CREATE TYPE "ProductCollectionJobStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ProductCollectionJobItemStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "ProductCollectionJob" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "status" "ProductCollectionJobStatus" NOT NULL DEFAULT 'PENDING',
    "searchCondition" JSONB NOT NULL,
    "totalCount" INTEGER,
    "collectedCount" INTEGER NOT NULL DEFAULT 0,
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "failCount" INTEGER NOT NULL DEFAULT 0,
    "currentPage" INTEGER NOT NULL DEFAULT 1,
    "pageSize" INTEGER NOT NULL DEFAULT 500,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductCollectionJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCollectionJobItem" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "channelProductNo" TEXT NOT NULL,
    "originProductNo" TEXT,
    "productName" TEXT,
    "status" "ProductCollectionJobItemStatus" NOT NULL DEFAULT 'PENDING',
    "errorMessage" TEXT,
    "collectedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductCollectionJobItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductCollectionJob_storeId_idx" ON "ProductCollectionJob"("storeId");

-- CreateIndex
CREATE INDEX "ProductCollectionJob_status_idx" ON "ProductCollectionJob"("status");

-- CreateIndex
CREATE INDEX "ProductCollectionJob_createdAt_idx" ON "ProductCollectionJob"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCollectionJobItem_jobId_channelProductNo_key" ON "ProductCollectionJobItem"("jobId", "channelProductNo");

-- CreateIndex
CREATE INDEX "ProductCollectionJobItem_jobId_idx" ON "ProductCollectionJobItem"("jobId");

-- CreateIndex
CREATE INDEX "ProductCollectionJobItem_storeId_channelProductNo_idx" ON "ProductCollectionJobItem"("storeId", "channelProductNo");

-- CreateIndex
CREATE INDEX "ProductCollectionJobItem_status_idx" ON "ProductCollectionJobItem"("status");

-- AddForeignKey
ALTER TABLE "ProductCollectionJob" ADD CONSTRAINT "ProductCollectionJob_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Smartstore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCollectionJobItem" ADD CONSTRAINT "ProductCollectionJobItem_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "ProductCollectionJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCollectionJobItem" ADD CONSTRAINT "ProductCollectionJobItem_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Smartstore"("id") ON DELETE CASCADE ON UPDATE CASCADE;
