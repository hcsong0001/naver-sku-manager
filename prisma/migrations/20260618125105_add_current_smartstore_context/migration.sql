-- AlterTable
ALTER TABLE "NaverProduct" ADD COLUMN     "currentSalePrice" INTEGER,
ADD COLUMN     "currentStateSource" TEXT,
ADD COLUMN     "currentStateSyncedAt" TIMESTAMP(3),
ADD COLUMN     "currentStockQuantity" INTEGER;

-- AlterTable
ALTER TABLE "NaverProductAdditional" ADD COLUMN     "currentStateSource" TEXT,
ADD COLUMN     "currentStateSyncedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "NaverProductOption" ADD COLUMN     "currentSalePrice" INTEGER,
ADD COLUMN     "currentStateSource" TEXT,
ADD COLUMN     "currentStateSyncedAt" TIMESTAMP(3),
ADD COLUMN     "currentStockQuantity" INTEGER;

-- AlterTable
ALTER TABLE "Smartstore" ADD COLUMN     "naverChannelId" TEXT;
