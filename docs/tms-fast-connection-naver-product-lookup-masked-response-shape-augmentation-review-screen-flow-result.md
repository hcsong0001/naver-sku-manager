# Task 413 - Naver 상품 조회 마스킹 응답 shape 보강 검토 화면

## 목적

Task 412의 candidate path만으로는 상품 식별 확정이 불가능하므로, 다음 별도 승인 단계에서
어떤 마스킹 shape 정보를 추가로 수집해야 하는지 read-only 화면으로 정리한다.

이번 Task에서는 실제 Naver API를 재호출하지 않고, raw response를 열람/표시/저장하지 않는다.

## 사무실 PC 작업 기준

- 작업 경로: `C:\Users\CORSAIR\Documents\naver-sku-manager`
- 기준 커밋: `80604e15ccc6f8f7a5009083c80c595417542772` (Task 412 커밋)

## Task 412 상품 식별 필드 매핑 검토 기준 상태

- 조회 1회 성공 여부: true / HTTP status: 200 / 실제 호출 수: 1
- 대상 API: `NAVER_COMMERCE_PRODUCT_LOOKUP_API` / 대상 상품번호: `6597910207`
- responseShapeKeys: `["originProduct", "smartstoreChannelProduct"]`
- productNoMatched: null
- candidate path 수: 7
- candidate path 값 표시 여부: 경로명만 표시
- 상품 식별 확정 여부: false
- 상품 수정 API 진입 허용 여부: false / 보류 여부: true
- 마스킹된 response shape 보강 필요 여부: true

## Naver API 상품 조회 1회 성공 증적

Task 409에서 HTTP 200으로 상품 조회 API 1회 호출이 성공했다. Task 410에서 이 결과를
고정 증적으로 유지했고, Task 412에서 상품 식별 후보 경로 7개를 값 없이 정리했다.

## productNoMatched null 해석

productNoMatched null은 조회 실패가 아니라, 현재 마스킹된 증적만으로는 어떤 응답 필드가
대상 상품번호 `6597910207`과 안전하게 대응되는지 아직 확정하지 못했다는 의미다.

## 현재 masked evidence 한계

- 현재 증적은 상품 조회 성공 여부와 top-level key 구조만 확인한다.
- `originProduct`, `smartstoreChannelProduct` 내부에 어떤 key가 있는지 key-only 수준으로도 아직 확정하지 않았다.
- candidate path 존재 여부, 값 타입, targetProductNo 일치 여부 같은 최소 shape 정보가 아직 없다.
- 따라서 상품 식별 확정과 상품 수정 API 진입은 계속 보류한다.

## 입력 ViewModel

- `TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView` (Task 412)

## 출력 ViewModel

- `TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView`

## Task 412 → Task 413 상태 매핑

- `..._FIELD_MAPPING_REVIEW_REQUIRED` → `..._AUGMENTATION_REVIEW_REQUIRED`
- `..._FIELD_MAPPING_REVIEW_OPTIONAL` → `..._AUGMENTATION_REVIEW_OPTIONAL`
- `..._FIELD_MAPPING_REVIEW_READY` → `..._AUGMENTATION_REVIEW_READY`
- `..._FIELD_MAPPING_REVIEW_BLOCKED` → `..._AUGMENTATION_REVIEW_BLOCKED`
- `..._FIELD_MAPPING_REVIEW_NOT_STARTED` → `..._AUGMENTATION_REVIEW_NOT_STARTED`

상태 매핑은 `Record<...>` 기반 exhaustive mapping으로 구현했다.

현재 Task 412 실제 판단(`REVIEW_REQUIRED`) 기준으로는 다음이 된다.

```text
TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED
```

## 8개 Masked Shape Augmentation Review 그룹

1. `MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_READINESS` - 검토 화면 준비도
2. `TASK_412_FIELD_MAPPING_REVIEW_REFERENCE` - Task 412 후보 경로 검토 참조
3. `CURRENT_MASKED_EVIDENCE_LIMITATION_SUMMARY` - 현재 증적 한계 요약
4. `REQUIRED_MASKED_SHAPE_AUGMENTATION_ITEMS` - 다음에 수집해야 할 최소 shape 항목 정의
5. `SAFE_MASKING_RULES_FOR_NEXT_STEP` - 다음 단계 허용/금지 마스킹 규칙 정의
6. `PRODUCT_IDENTITY_CONFIRMATION_CRITERIA` - productNoMatched true 판정 기준 정의
7. `UPDATE_API_ENTRY_STILL_DEFERRED_GUARD` - 상품 수정 API 진입 계속 보류
8. `NEXT_MASKED_SHAPE_AUGMENTATION_APPROVAL_PACKET_ROADMAP` - Task 414 승인 Packet 로드맵

## 보강 필요 항목 목록

아래 항목은 실제 값을 수집하는 것이 아니라, 다음 단계에서 보강해야 할 shape 항목 정의만 포함한다.

- `candidate path exists 여부`
- `candidate path value type`
- `candidate path value masked preview 가능 여부`
- `candidate path value equals targetProductNo 여부`
- `smartstoreChannelProduct 내부 key 목록의 마스킹된 key-only shape`
- `originProduct 내부 key 목록의 마스킹된 key-only shape`
- `product identity confidence score 산정 기준`

각 항목은 다음 상태를 갖는다.

- `augmentationItemOnly: true`
- `actualValueRead: false`
- `actualValueDisplayed: false`
- `actualRawResponseAccessed: false`
- `actualApiRecalled: false`
- `requiresSeparateApprovalBeforeCollection: true`

## allowedMaskedShapeData / forbiddenData 구분

허용 데이터:

- `topLevelKeys`
- `nestedKeyNamesOnly`
- `candidatePathExistsBoolean`
- `candidatePathValueTypeOnly`
- `candidatePathValueMaskedPreviewLast4Only`
- `candidatePathEqualsTargetProductNoBoolean`
- `productIdentityConfidenceScore`

금지 데이터:

- `rawResponseBody`
- `fullProductName`
- `fullOptionName`
- `fullSellerManagementCode`
- `fullClientId`
- `clientSecret`
- `accessToken`
- `authorizationHeader`
- `signature`
- `fullRawRequest`
- `fullRawResponse`

## 보강 수집은 아직 수행하지 않음

- `maskedShapeAugmentationReviewed: true`
- `maskedShapeAugmentationCollectionPerformed: false`
- Task 413은 수집 실행이 아니라 보강 범위와 마스킹 규칙 정의만 수행한다.

## 상품 수정 API 진입 보류 유지

- `productIdentityMatchConfirmed: false`
- `productUpdateApiEntryAllowedNow: false`
- `productUpdateApiEntryDeferred: true`
- `productUpdateApiCallAllowed: false`
- `priceChangeAllowed: false`
- `stockChangeAllowed: false`
- `dbWriteAllowed: false`

## raw response 표시/저장 금지 준수

- `actualRawApiResponseExposure: false`
- `actualRawApiResponseStored: false`

## secret/token/header/signature 노출 금지 준수

- `actualSecretExposure: false`
- `actualTokenExposure: false`
- `actualAuthorizationHeaderExposure: false`
- `actualSignatureExposure: false`

## 상품 수정/가격 변경/재고 변경/DB write 금지 준수

- `actualProductUpdateApiCall: false`
- `actualProductUpdateExecuted: false`
- `actualPriceChange: false`
- `actualStockChange: false`
- `actualDbWrite: false`

## Task 413에서 API 재호출이 없다는 점

- `actualNaverApiCallInTask413: false`
- `actualProductLookupApiCallInTask413: false`
- `actualProductLookupApiRecall: false`

## Task 413에서 env/process.env/secret/token 접근이 없다는 점

- `actualEnvReadInTask413: false`
- `actualEnvFileOpenInTask413: false`
- `actualProcessEnvReadInTask413: false`
- `actualSecretAccessInTask413: false`
- `actualTokenUseInTask413: false`

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 412 ViewModel을 입력으로 Task 413 ViewModel 생성
  - GET 응답에 `tmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView` 추가
  - 실제 Naver API 호출, env/process.env/secret/token/raw response 접근 없음
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 413 타입 필드 추가
  - Task 412 바로 아래, Task 332 바로 위에 Task 413 패널 추가
  - 보강 필요 항목, allowedMaskedShapeData, forbiddenData, 보강 수집 미실행, 다음 Task 414 로드맵을 표시
  - 실행 버튼/승인 버튼/submit action/POST 호출 추가 없음

## 검증 결과

- Task 413 신규 테스트 통과
- 인접 Task 412 / Task 411 / Task 410 ViewModel 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 414 방향

- `Task 414 - Naver 상품 조회 마스킹 응답 shape 보강 별도 승인 Packet`
