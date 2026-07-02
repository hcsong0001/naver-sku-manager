# Task 416 - Naver 상품 조회 마스킹 응답 shape 보강 실제 수집

## 목적

사용자의 별도 승인 문구가 확인된 상태에서, 상품번호 `6597910207`에 한해 Naver 상품 조회 API를
최대 1회만 재호출하고 raw response 전체를 저장하거나 표시하지 않은 상태로 상품 식별 확정에 필요한
마스킹 응답 shape 정보만 수집한다.

## 사무실 PC 작업 기준

- 작업 경로: `C:\Users\CORSAIR\Documents\naver-sku-manager`
- 기준 커밋: `70972a5e0b6e44ce4fd79186eff6ef34f832933a` (Task 415 커밋)

## 사용자의 별도 승인 문구 확인

```text
Naver 상품 조회 마스킹 응답 shape 보강 수집을 별도로 승인합니다.
```

## Task 415 Final Gate 기준 상태

- 조회 1회 성공 여부: true
- HTTP status: 200
- 실제 호출 수: 1
- 대상 API: `NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- 대상 상품번호: `6597910207`
- productNoMatched: null
- 마스킹 shape 보강 Final Gate 준비 여부: true
- 보강 수집 실행 여부: false
- API 재호출 여부: false
- 상품 수정 API 진입 허용 여부: false

## 대상 API와 대표 상품번호

- 대상 API: `NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- 대상 상품번호: `6597910207`
- maxRecallCount: `1`

## 실제 수집 실행 결과

- 실행 시각: `2026-07-02T12:04:40.8199127+09:00`
- 실행 완료 시각: `2026-07-02T12:04:54.8988350+09:00`
- 실제 수집 실행 여부: `true`
- actualRecallCount: `1`
- success 여부: `true`
- httpStatusCode: `200`
- responseShapeKeys:
  - `originProduct`
  - `smartstoreChannelProduct`
- candidatePathResults:
  - `smartstoreChannelProduct.channelProductNo` → `exists: false`, `valueType: undefined`, `maskedPreviewLast4: null`, `equalsTargetProductNo: null`
  - `smartstoreChannelProduct.id` → `exists: false`, `valueType: undefined`, `maskedPreviewLast4: null`, `equalsTargetProductNo: null`
  - `smartstoreChannelProduct.productNo` → `exists: false`, `valueType: undefined`, `maskedPreviewLast4: null`, `equalsTargetProductNo: null`
  - `smartstoreChannelProduct.originProductNo` → `exists: false`, `valueType: undefined`, `maskedPreviewLast4: null`, `equalsTargetProductNo: null`
  - `originProduct.originProductNo` → `exists: false`, `valueType: undefined`, `maskedPreviewLast4: null`, `equalsTargetProductNo: null`
  - `originProduct.id` → `exists: false`, `valueType: undefined`, `maskedPreviewLast4: null`, `equalsTargetProductNo: null`
  - `originProduct.productNo` → `exists: false`, `valueType: undefined`, `maskedPreviewLast4: null`, `equalsTargetProductNo: null`
- productIdentityConfidenceScore: `30`
- productIdentityMatchConfirmed: `false`
- productIdentityMatchReason:
  - `top-level response shape는 확인되었지만 candidate path 7개에서 식별 필드가 확인되지 않아 confidence score를 30으로 유지했습니다.`
- sanitizedErrorMessage: `null`

## raw response 표시/저장 금지 준수

- `rawResponseDisplayed: false`
- `rawResponseStored: false`

## secret/token/header/signature 노출 금지 준수

- `secretExposed: false`
- `tokenExposed: false`
- `authorizationHeaderExposed: false`
- `signatureExposed: false`

## full product name/full option name/full seller management code 노출 금지 준수

- `actualFullProductNameExposure: false`
- `actualFullOptionNameExposure: false`
- `actualFullSellerManagementCodeExposure: false`

## 상품 수정/가격 변경/재고 변경/DB write 금지 준수

- `productUpdateCalled: false`
- `priceChanged: false`
- `stockChanged: false`
- `dbWritten: false`

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 415 ViewModel을 입력으로 Task 416 Actual Collection ViewModel 생성
  - GET 응답에 `tmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView` 추가
  - GET route 안에서 실제 Naver API 호출, env/process.env/secret/token/raw response 접근 없음
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 416 타입 필드 추가
  - Task 415 바로 아래, Task 332 바로 위에 Task 416 패널 추가
  - 승인 문구 확인, 대상 상품번호, 최대 재조회 수, 실제 수집 결과 요약, candidatePathResults, product identity confidence score, 안전 금지선을 read-only로 표시
  - 실행 버튼/승인 버튼/승인 입력창/submit action/POST 호출 추가 없음

## 검증 결과

- Task 416 ViewModel 테스트 통과
- Task 416 harness 테스트 통과
- 인접 Task 415 / Task 414 / Task 413 테스트 재검증 통과
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 417 방향

- `Task 417 - Naver 상품 식별 확정 판단 화면`
