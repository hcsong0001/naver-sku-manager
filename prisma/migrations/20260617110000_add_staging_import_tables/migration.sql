-- CreateEnum
CREATE TYPE "ImportJobStatus" AS ENUM ('PENDING', 'PREVIEWED', 'APPLIED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ImportFileType" AS ENUM ('ERP_STOCK', 'SMARTSTORE_PRODUCT', 'SKU_MAPPING', 'PRODUCT_VARIANT_KEYWORD');

-- CreateTable
CREATE TABLE "ImportJob" (
    "id" TEXT NOT NULL,
    "fileType" "ImportFileType" NOT NULL,
    "storeId" TEXT,
    "channelId" TEXT,
    "fileName" TEXT NOT NULL,
    "status" "ImportJobStatus" NOT NULL DEFAULT 'PENDING',
    "totalRows" INTEGER NOT NULL DEFAULT 0,
    "successRows" INTEGER NOT NULL DEFAULT 0,
    "errorRows" INTEGER NOT NULL DEFAULT 0,
    "previewSummary" JSONB,
    "errorSummary" JSONB,
    "appliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImportJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportFile" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "fileType" "ImportFileType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT,
    "sizeBytes" INTEGER,
    "status" "ImportJobStatus" NOT NULL DEFAULT 'PENDING',
    "totalRows" INTEGER NOT NULL DEFAULT 0,
    "successRows" INTEGER NOT NULL DEFAULT 0,
    "errorRows" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImportFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StagingStockItem" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "importFileId" TEXT,
    "rowNumber" INTEGER NOT NULL,
    "barcode" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "purchaseProductName" TEXT NOT NULL,
    "internalProductCode" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "supplierItemCode" TEXT NOT NULL,
    "optionCode" TEXT NOT NULL,
    "sellingPrice" DECIMAL(12,2),
    "costPrice" DECIMAL(12,2),
    "stockQuantity" INTEGER,
    "skuCodeCandidate" TEXT NOT NULL,
    "sourceRow" JSONB,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StagingStockItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StagingNaverProduct" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "importFileId" TEXT,
    "storeId" TEXT,
    "rowNumber" INTEGER NOT NULL,
    "externalProductId" TEXT,
    "channelProductNo" TEXT,
    "originProductNo" TEXT,
    "productName" TEXT NOT NULL,
    "statusType" TEXT,
    "sellerManagementCode" TEXT,
    "sourceRow" JSONB,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StagingNaverProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StagingNaverProductOption" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "importFileId" TEXT,
    "stagingProductId" TEXT,
    "rowNumber" INTEGER NOT NULL,
    "channelProductNo" TEXT,
    "optionId" TEXT,
    "optionName" TEXT NOT NULL,
    "optionValue" TEXT NOT NULL,
    "optionCode" TEXT,
    "sourceRow" JSONB,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StagingNaverProductOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StagingNaverProductAdditional" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "importFileId" TEXT,
    "stagingProductId" TEXT,
    "rowNumber" INTEGER NOT NULL,
    "channelProductNo" TEXT,
    "additionalId" TEXT,
    "additionalName" TEXT NOT NULL,
    "additionalValue" TEXT NOT NULL,
    "sellerManagementCode" TEXT,
    "price" INTEGER,
    "stockQuantity" INTEGER,
    "usable" BOOLEAN,
    "sortType" TEXT,
    "sourceRow" JSONB,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StagingNaverProductAdditional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StagingSkuMapping" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "importFileId" TEXT,
    "rowNumber" INTEGER NOT NULL,
    "mappingType" TEXT NOT NULL,
    "smartstoreName" TEXT NOT NULL,
    "channelProductNo" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "managementCode" TEXT NOT NULL,
    "currentSkuCode" TEXT NOT NULL,
    "skuCode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sourceRow" JSONB,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StagingSkuMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StagingProductVariantKeyword" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "importFileId" TEXT,
    "rowNumber" INTEGER NOT NULL,
    "channelProductNo" TEXT,
    "mappingType" TEXT,
    "itemId" TEXT,
    "itemName" TEXT,
    "serialNo" TEXT NOT NULL,
    "productMatchName" TEXT NOT NULL,
    "productOptionText" TEXT NOT NULL,
    "stockMatchedProductName" TEXT NOT NULL,
    "stockMatchedOptionText" TEXT NOT NULL,
    "quantityText" TEXT NOT NULL,
    "resolvedSkuCode" TEXT,
    "resolvedModelCodes" TEXT,
    "barcode" TEXT,
    "quantity" INTEGER,
    "isSetProduct" BOOLEAN NOT NULL DEFAULT false,
    "confidence" DECIMAL(8,4),
    "warningMessage" TEXT,
    "resolvedSkus" JSONB,
    "sourceRow" JSONB,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StagingProductVariantKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ImportJob_fileType_idx" ON "ImportJob"("fileType");

-- CreateIndex
CREATE INDEX "ImportJob_storeId_idx" ON "ImportJob"("storeId");

-- CreateIndex
CREATE INDEX "ImportJob_status_idx" ON "ImportJob"("status");

-- CreateIndex
CREATE INDEX "ImportJob_createdAt_idx" ON "ImportJob"("createdAt");

-- CreateIndex
CREATE INDEX "ImportFile_jobId_idx" ON "ImportFile"("jobId");

-- CreateIndex
CREATE INDEX "ImportFile_fileType_idx" ON "ImportFile"("fileType");

-- CreateIndex
CREATE INDEX "StagingStockItem_jobId_rowNumber_idx" ON "StagingStockItem"("jobId", "rowNumber");

-- CreateIndex
CREATE INDEX "StagingStockItem_importFileId_idx" ON "StagingStockItem"("importFileId");

-- CreateIndex
CREATE INDEX "StagingStockItem_barcode_idx" ON "StagingStockItem"("barcode");

-- CreateIndex
CREATE INDEX "StagingStockItem_skuCodeCandidate_idx" ON "StagingStockItem"("skuCodeCandidate");

-- CreateIndex
CREATE INDEX "StagingNaverProduct_jobId_rowNumber_idx" ON "StagingNaverProduct"("jobId", "rowNumber");

-- CreateIndex
CREATE INDEX "StagingNaverProduct_importFileId_idx" ON "StagingNaverProduct"("importFileId");

-- CreateIndex
CREATE INDEX "StagingNaverProduct_storeId_idx" ON "StagingNaverProduct"("storeId");

-- CreateIndex
CREATE INDEX "StagingNaverProduct_channelProductNo_idx" ON "StagingNaverProduct"("channelProductNo");

-- CreateIndex
CREATE INDEX "StagingNaverProduct_originProductNo_idx" ON "StagingNaverProduct"("originProductNo");

-- CreateIndex
CREATE INDEX "StagingNaverProductOption_jobId_rowNumber_idx" ON "StagingNaverProductOption"("jobId", "rowNumber");

-- CreateIndex
CREATE INDEX "StagingNaverProductOption_importFileId_idx" ON "StagingNaverProductOption"("importFileId");

-- CreateIndex
CREATE INDEX "StagingNaverProductOption_stagingProductId_idx" ON "StagingNaverProductOption"("stagingProductId");

-- CreateIndex
CREATE INDEX "StagingNaverProductOption_channelProductNo_idx" ON "StagingNaverProductOption"("channelProductNo");

-- CreateIndex
CREATE INDEX "StagingNaverProductOption_optionCode_idx" ON "StagingNaverProductOption"("optionCode");

-- CreateIndex
CREATE INDEX "StagingNaverProductAdditional_jobId_rowNumber_idx" ON "StagingNaverProductAdditional"("jobId", "rowNumber");

-- CreateIndex
CREATE INDEX "StagingNaverProductAdditional_importFileId_idx" ON "StagingNaverProductAdditional"("importFileId");

-- CreateIndex
CREATE INDEX "StagingNaverProductAdditional_stagingProductId_idx" ON "StagingNaverProductAdditional"("stagingProductId");

-- CreateIndex
CREATE INDEX "StagingNaverProductAdditional_channelProductNo_idx" ON "StagingNaverProductAdditional"("channelProductNo");

-- CreateIndex
CREATE INDEX "StagingNaverProductAdditional_sellerManagementCode_idx" ON "StagingNaverProductAdditional"("sellerManagementCode");

-- CreateIndex
CREATE INDEX "StagingSkuMapping_jobId_rowNumber_idx" ON "StagingSkuMapping"("jobId", "rowNumber");

-- CreateIndex
CREATE INDEX "StagingSkuMapping_importFileId_idx" ON "StagingSkuMapping"("importFileId");

-- CreateIndex
CREATE INDEX "StagingSkuMapping_mappingType_itemId_idx" ON "StagingSkuMapping"("mappingType", "itemId");

-- CreateIndex
CREATE INDEX "StagingSkuMapping_skuCode_idx" ON "StagingSkuMapping"("skuCode");

-- CreateIndex
CREATE INDEX "StagingProductVariantKeyword_jobId_rowNumber_idx" ON "StagingProductVariantKeyword"("jobId", "rowNumber");

-- CreateIndex
CREATE INDEX "StagingProductVariantKeyword_importFileId_idx" ON "StagingProductVariantKeyword"("importFileId");

-- CreateIndex
CREATE INDEX "StagingProductVariantKeyword_channelProductNo_idx" ON "StagingProductVariantKeyword"("channelProductNo");

-- CreateIndex
CREATE INDEX "StagingProductVariantKeyword_mappingType_itemId_idx" ON "StagingProductVariantKeyword"("mappingType", "itemId");

-- CreateIndex
CREATE INDEX "StagingProductVariantKeyword_serialNo_idx" ON "StagingProductVariantKeyword"("serialNo");

-- AddForeignKey
ALTER TABLE "ImportJob" ADD CONSTRAINT "ImportJob_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Smartstore"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportFile" ADD CONSTRAINT "ImportFile_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "ImportJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingStockItem" ADD CONSTRAINT "StagingStockItem_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "ImportJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingStockItem" ADD CONSTRAINT "StagingStockItem_importFileId_fkey" FOREIGN KEY ("importFileId") REFERENCES "ImportFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingNaverProduct" ADD CONSTRAINT "StagingNaverProduct_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "ImportJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingNaverProduct" ADD CONSTRAINT "StagingNaverProduct_importFileId_fkey" FOREIGN KEY ("importFileId") REFERENCES "ImportFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingNaverProductOption" ADD CONSTRAINT "StagingNaverProductOption_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "ImportJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingNaverProductOption" ADD CONSTRAINT "StagingNaverProductOption_importFileId_fkey" FOREIGN KEY ("importFileId") REFERENCES "ImportFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingNaverProductOption" ADD CONSTRAINT "StagingNaverProductOption_stagingProductId_fkey" FOREIGN KEY ("stagingProductId") REFERENCES "StagingNaverProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingNaverProductAdditional" ADD CONSTRAINT "StagingNaverProductAdditional_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "ImportJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingNaverProductAdditional" ADD CONSTRAINT "StagingNaverProductAdditional_importFileId_fkey" FOREIGN KEY ("importFileId") REFERENCES "ImportFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingNaverProductAdditional" ADD CONSTRAINT "StagingNaverProductAdditional_stagingProductId_fkey" FOREIGN KEY ("stagingProductId") REFERENCES "StagingNaverProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingSkuMapping" ADD CONSTRAINT "StagingSkuMapping_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "ImportJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingSkuMapping" ADD CONSTRAINT "StagingSkuMapping_importFileId_fkey" FOREIGN KEY ("importFileId") REFERENCES "ImportFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingProductVariantKeyword" ADD CONSTRAINT "StagingProductVariantKeyword_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "ImportJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingProductVariantKeyword" ADD CONSTRAINT "StagingProductVariantKeyword_importFileId_fkey" FOREIGN KEY ("importFileId") REFERENCES "ImportFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
