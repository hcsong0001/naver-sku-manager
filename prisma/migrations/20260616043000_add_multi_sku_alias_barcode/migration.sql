-- 기존 별칭 코드를 새 value 필드로 보존
DROP INDEX IF EXISTS "SkuAlias_aliasCode_idx";
DROP INDEX IF EXISTS "SkuAlias_skuId_aliasCode_key";
ALTER TABLE "SkuAlias" RENAME COLUMN "aliasCode" TO "value";
ALTER TABLE "SkuAlias" ADD COLUMN "source" TEXT;
ALTER TABLE "SkuAlias" ADD COLUMN "memo" TEXT;

-- 판매항목별 다중 SKU 매핑
CREATE TABLE "NaverProductSku" (
    "id" TEXT NOT NULL,
    "naverProductId" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "NaverProductSku_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "NaverProductOptionSku" (
    "id" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "NaverProductOptionSku_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "NaverProductAdditionalSku" (
    "id" TEXT NOT NULL,
    "additionalId" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "NaverProductAdditionalSku_pkey" PRIMARY KEY ("id")
);

-- 포장단위별 실제 바코드 관리
CREATE TABLE "SkuBarcode" (
    "id" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "unitName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "barcodeType" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "memo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SkuBarcode_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "NaverProductSku_naverProductId_idx" ON "NaverProductSku"("naverProductId");
CREATE INDEX "NaverProductSku_skuId_idx" ON "NaverProductSku"("skuId");
CREATE UNIQUE INDEX "NaverProductSku_naverProductId_skuId_key" ON "NaverProductSku"("naverProductId", "skuId");

CREATE INDEX "NaverProductOptionSku_optionId_idx" ON "NaverProductOptionSku"("optionId");
CREATE INDEX "NaverProductOptionSku_skuId_idx" ON "NaverProductOptionSku"("skuId");
CREATE UNIQUE INDEX "NaverProductOptionSku_optionId_skuId_key" ON "NaverProductOptionSku"("optionId", "skuId");

CREATE INDEX "NaverProductAdditionalSku_additionalId_idx" ON "NaverProductAdditionalSku"("additionalId");
CREATE INDEX "NaverProductAdditionalSku_skuId_idx" ON "NaverProductAdditionalSku"("skuId");
CREATE UNIQUE INDEX "NaverProductAdditionalSku_additionalId_skuId_key" ON "NaverProductAdditionalSku"("additionalId", "skuId");

CREATE INDEX "SkuAlias_aliasType_idx" ON "SkuAlias"("aliasType");
CREATE INDEX "SkuAlias_value_idx" ON "SkuAlias"("value");
CREATE UNIQUE INDEX "SkuAlias_skuId_aliasType_value_key" ON "SkuAlias"("skuId", "aliasType", "value");

CREATE INDEX "SkuBarcode_skuId_idx" ON "SkuBarcode"("skuId");
CREATE INDEX "SkuBarcode_barcode_idx" ON "SkuBarcode"("barcode");
CREATE INDEX "SkuBarcode_unitName_idx" ON "SkuBarcode"("unitName");
CREATE UNIQUE INDEX "SkuBarcode_skuId_barcode_key" ON "SkuBarcode"("skuId", "barcode");

ALTER TABLE "NaverProductSku" ADD CONSTRAINT "NaverProductSku_naverProductId_fkey" FOREIGN KEY ("naverProductId") REFERENCES "NaverProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "NaverProductSku" ADD CONSTRAINT "NaverProductSku_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "NaverProductOptionSku" ADD CONSTRAINT "NaverProductOptionSku_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "NaverProductOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "NaverProductOptionSku" ADD CONSTRAINT "NaverProductOptionSku_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "NaverProductAdditionalSku" ADD CONSTRAINT "NaverProductAdditionalSku_additionalId_fkey" FOREIGN KEY ("additionalId") REFERENCES "NaverProductAdditional"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "NaverProductAdditionalSku" ADD CONSTRAINT "NaverProductAdditionalSku_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SkuBarcode" ADD CONSTRAINT "SkuBarcode_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 호환용 skuId 연결을 새 다중 매핑 테이블로 백필
INSERT INTO "NaverProductSku" ("id", "naverProductId", "skuId", "quantity", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, "id", "skuId", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "NaverProduct"
WHERE "skuId" IS NOT NULL
ON CONFLICT ("naverProductId", "skuId") DO NOTHING;

INSERT INTO "NaverProductOptionSku" ("id", "optionId", "skuId", "quantity", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, "id", "skuId", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "NaverProductOption"
WHERE "skuId" IS NOT NULL
ON CONFLICT ("optionId", "skuId") DO NOTHING;

INSERT INTO "NaverProductAdditionalSku" ("id", "additionalId", "skuId", "quantity", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, "id", "skuId", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "NaverProductAdditional"
WHERE "skuId" IS NOT NULL
ON CONFLICT ("additionalId", "skuId") DO NOTHING;

-- 기존 단일 바코드는 낱개 대표 바코드로 백필
INSERT INTO "SkuBarcode" ("id", "skuId", "barcode", "unitName", "quantity", "barcodeType", "isPrimary", "source", "memo", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, "id", "barcode", '낱개', 1, 'PRODUCT', true, '기존 Sku.barcode', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "Sku"
WHERE "barcode" IS NOT NULL AND btrim("barcode") <> ''
ON CONFLICT ("skuId", "barcode") DO NOTHING;
