-- Smartstore에 네이버 API 인증 관련 컬럼 추가
ALTER TABLE "Smartstore"
ADD COLUMN "clientId" TEXT,
ADD COLUMN "clientSecret" TEXT,
ADD COLUMN "accessToken" TEXT,
ADD COLUMN "tokenExpiresAt" TIMESTAMP(3),
ADD COLUMN "naverPartnerType" TEXT NOT NULL DEFAULT 'SELF',
ADD COLUMN "naverAccountId" TEXT;

-- NaverProduct에 채널상품번호 추가
ALTER TABLE "NaverProduct"
ADD COLUMN "channelProductNo" TEXT;

CREATE UNIQUE INDEX "NaverProduct_channelProductNo_key" ON "NaverProduct"("channelProductNo");

-- 선택/추가상품의 skuId를 nullable로 변경하고 FK 동작을 현재 스키마에 맞춤
ALTER TABLE "NaverProductOption" DROP CONSTRAINT "NaverProductOption_skuId_fkey";
ALTER TABLE "NaverProductOption" ALTER COLUMN "skuId" DROP NOT NULL;
ALTER TABLE "NaverProductOption"
ADD CONSTRAINT "NaverProductOption_skuId_fkey"
FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "NaverProductAdditional" DROP CONSTRAINT "NaverProductAdditional_skuId_fkey";
ALTER TABLE "NaverProductAdditional" ALTER COLUMN "skuId" DROP NOT NULL;
ALTER TABLE "NaverProductAdditional"
ADD CONSTRAINT "NaverProductAdditional_skuId_fkey"
FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE SET NULL ON UPDATE CASCADE;
