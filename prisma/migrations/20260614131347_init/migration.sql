-- CreateTable
CREATE TABLE "Smartstore" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "storeUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Smartstore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sku" (
    "id" TEXT NOT NULL,
    "skuCode" TEXT NOT NULL,
    "sellerProductCode" TEXT,
    "barcode" TEXT,
    "supplierCode" TEXT,
    "costPrice" DECIMAL(12,2) NOT NULL DEFAULT 0.0,
    "sellingPrice" DECIMAL(12,2) NOT NULL DEFAULT 0.0,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "safetyStock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NaverProduct" (
    "id" TEXT NOT NULL,
    "smartstoreId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "naverProductId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SALE',
    "skuId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NaverProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NaverProductOption" (
    "id" TEXT NOT NULL,
    "naverProductId" TEXT NOT NULL,
    "optionName" TEXT NOT NULL,
    "optionValue" TEXT NOT NULL,
    "optionCode" TEXT,
    "skuId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NaverProductOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NaverProductAdditional" (
    "id" TEXT NOT NULL,
    "naverProductId" TEXT NOT NULL,
    "additionalName" TEXT NOT NULL,
    "additionalValue" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NaverProductAdditional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StorePriceRule" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "fixedPrice" DECIMAL(12,2),
    "ratePercent" DECIMAL(5,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StorePriceRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkuAlias" (
    "id" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "aliasCode" TEXT NOT NULL,
    "aliasType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkuAlias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyncRule" (
    "id" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "targetPrice" DECIMAL(12,2) NOT NULL,
    "syncStock" BOOLEAN NOT NULL DEFAULT true,
    "syncPrice" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SyncRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkuCostHistory" (
    "id" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "costPrice" DECIMAL(12,2) NOT NULL,
    "effectiveFrom" TIMESTAMP(3) NOT NULL,
    "effectiveTo" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SkuCostHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderItem" (
    "id" TEXT NOT NULL,
    "purchaseOrderId" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "receivedQuantity" INTEGER NOT NULL DEFAULT 0,
    "unitPrice" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "smartstoreId" TEXT NOT NULL,
    "naverOrderId" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sellingPrice" DECIMAL(12,2) NOT NULL,
    "settlementAmount" DECIMAL(12,2) NOT NULL,
    "costAtOrder" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitorLink" (
    "id" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "competitorName" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompetitorLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitorPriceHistory" (
    "id" TEXT NOT NULL,
    "competitorLinkId" TEXT NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "stockStatus" TEXT,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompetitorPriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Smartstore_sellerId_key" ON "Smartstore"("sellerId");

-- CreateIndex
CREATE INDEX "Smartstore_sellerId_idx" ON "Smartstore"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "Sku_skuCode_key" ON "Sku"("skuCode");

-- CreateIndex
CREATE INDEX "Sku_skuCode_idx" ON "Sku"("skuCode");

-- CreateIndex
CREATE INDEX "Sku_barcode_idx" ON "Sku"("barcode");

-- CreateIndex
CREATE INDEX "Sku_supplierCode_idx" ON "Sku"("supplierCode");

-- CreateIndex
CREATE UNIQUE INDEX "NaverProduct_naverProductId_key" ON "NaverProduct"("naverProductId");

-- CreateIndex
CREATE INDEX "NaverProduct_smartstoreId_idx" ON "NaverProduct"("smartstoreId");

-- CreateIndex
CREATE INDEX "NaverProduct_skuId_idx" ON "NaverProduct"("skuId");

-- CreateIndex
CREATE INDEX "NaverProduct_naverProductId_idx" ON "NaverProduct"("naverProductId");

-- CreateIndex
CREATE INDEX "NaverProductOption_naverProductId_idx" ON "NaverProductOption"("naverProductId");

-- CreateIndex
CREATE INDEX "NaverProductOption_skuId_idx" ON "NaverProductOption"("skuId");

-- CreateIndex
CREATE INDEX "NaverProductOption_optionCode_idx" ON "NaverProductOption"("optionCode");

-- CreateIndex
CREATE INDEX "NaverProductAdditional_naverProductId_idx" ON "NaverProductAdditional"("naverProductId");

-- CreateIndex
CREATE INDEX "NaverProductAdditional_skuId_idx" ON "NaverProductAdditional"("skuId");

-- CreateIndex
CREATE INDEX "StorePriceRule_storeId_idx" ON "StorePriceRule"("storeId");

-- CreateIndex
CREATE INDEX "StorePriceRule_skuId_idx" ON "StorePriceRule"("skuId");

-- CreateIndex
CREATE UNIQUE INDEX "StorePriceRule_storeId_skuId_key" ON "StorePriceRule"("storeId", "skuId");

-- CreateIndex
CREATE INDEX "SkuAlias_skuId_idx" ON "SkuAlias"("skuId");

-- CreateIndex
CREATE INDEX "SkuAlias_aliasCode_idx" ON "SkuAlias"("aliasCode");

-- CreateIndex
CREATE UNIQUE INDEX "SkuAlias_skuId_aliasCode_key" ON "SkuAlias"("skuId", "aliasCode");

-- CreateIndex
CREATE UNIQUE INDEX "SyncRule_skuId_key" ON "SyncRule"("skuId");

-- CreateIndex
CREATE INDEX "SyncRule_skuId_idx" ON "SyncRule"("skuId");

-- CreateIndex
CREATE INDEX "SkuCostHistory_skuId_idx" ON "SkuCostHistory"("skuId");

-- CreateIndex
CREATE INDEX "PurchaseOrder_supplierId_idx" ON "PurchaseOrder"("supplierId");

-- CreateIndex
CREATE INDEX "PurchaseOrder_status_idx" ON "PurchaseOrder"("status");

-- CreateIndex
CREATE INDEX "PurchaseOrderItem_purchaseOrderId_idx" ON "PurchaseOrderItem"("purchaseOrderId");

-- CreateIndex
CREATE INDEX "PurchaseOrderItem_skuId_idx" ON "PurchaseOrderItem"("skuId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_naverOrderId_key" ON "Order"("naverOrderId");

-- CreateIndex
CREATE INDEX "Order_smartstoreId_idx" ON "Order"("smartstoreId");

-- CreateIndex
CREATE INDEX "Order_naverOrderId_idx" ON "Order"("naverOrderId");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_skuId_idx" ON "OrderItem"("skuId");

-- CreateIndex
CREATE INDEX "CompetitorLink_skuId_idx" ON "CompetitorLink"("skuId");

-- CreateIndex
CREATE INDEX "CompetitorPriceHistory_competitorLinkId_idx" ON "CompetitorPriceHistory"("competitorLinkId");

-- AddForeignKey
ALTER TABLE "NaverProduct" ADD CONSTRAINT "NaverProduct_smartstoreId_fkey" FOREIGN KEY ("smartstoreId") REFERENCES "Smartstore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NaverProduct" ADD CONSTRAINT "NaverProduct_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NaverProductOption" ADD CONSTRAINT "NaverProductOption_naverProductId_fkey" FOREIGN KEY ("naverProductId") REFERENCES "NaverProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NaverProductOption" ADD CONSTRAINT "NaverProductOption_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NaverProductAdditional" ADD CONSTRAINT "NaverProductAdditional_naverProductId_fkey" FOREIGN KEY ("naverProductId") REFERENCES "NaverProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NaverProductAdditional" ADD CONSTRAINT "NaverProductAdditional_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorePriceRule" ADD CONSTRAINT "StorePriceRule_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Smartstore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorePriceRule" ADD CONSTRAINT "StorePriceRule_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkuAlias" ADD CONSTRAINT "SkuAlias_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncRule" ADD CONSTRAINT "SyncRule_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkuCostHistory" ADD CONSTRAINT "SkuCostHistory_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_smartstoreId_fkey" FOREIGN KEY ("smartstoreId") REFERENCES "Smartstore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitorLink" ADD CONSTRAINT "CompetitorLink_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitorPriceHistory" ADD CONSTRAINT "CompetitorPriceHistory_competitorLinkId_fkey" FOREIGN KEY ("competitorLinkId") REFERENCES "CompetitorLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
