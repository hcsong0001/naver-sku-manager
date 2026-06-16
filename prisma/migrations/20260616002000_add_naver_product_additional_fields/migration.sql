-- AlterTable
ALTER TABLE "NaverProductAdditional" ADD COLUMN "price" INTEGER,
ADD COLUMN "sellerManagementCode" TEXT,
ADD COLUMN "sortType" TEXT,
ADD COLUMN "stockQuantity" INTEGER,
ADD COLUMN "usable" BOOLEAN;

-- CreateIndex
CREATE INDEX "NaverProductAdditional_sellerManagementCode_idx" ON "NaverProductAdditional"("sellerManagementCode");
