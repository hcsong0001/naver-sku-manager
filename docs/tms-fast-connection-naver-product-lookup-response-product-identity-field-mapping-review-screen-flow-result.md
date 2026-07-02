# Task 412 - Naver 상품 조회 응답 상품 식별 필드 매핑 검토 화면

## 목적

상품 수정 API로 넘어가기 전에, Task 409 조회 응답에서 어떤 필드를 상품 식별 기준으로
삼아야 하는지 검토하는 read-only 화면을 추가한다. Task 410/411의 마스킹된 결과 증적만
기반으로 상품 식별 필드 후보를 정리하고, 현재 어떤 필드가 확정/미확정인지 표시한다.

이번 Task에서는 실제 Naver API를 재호출하지 않고, raw response를 열람/표시/저장하지 않는다.

## 사무실 PC 작업 기준

- 작업 경로: `C:\Users\CORSAIR\Documents\naver-sku-manager`
- 기준 커밋: `aa43616aed071a9b391beb630e84a8b454d0cb6b` (Task 411 커밋)

## Task 411 상품 수정 API 진입 보류 기준 상태

- 조회 1회 성공 여부: true / HTTP status: 200 / 실제 호출 수: 1
- 대상 API: `NAVER_COMMERCE_PRODUCT_LOOKUP_API` / 대상 상품번호: `6597910207`
- responseShapeKeys: `["originProduct", "smartstoreChannelProduct"]`
- productNoMatched: null
- 상품 수정 API 진입 허용 여부: false / 보류 여부: true
- 보류 사유: `PRODUCT_IDENTITY_NOT_CONFIRMED_FROM_MASKED_EVIDENCE`

## Naver API 상품 조회 1회 성공 증적

Task 409에서 HTTP 200으로 상품 조회 API 1회 호출이 성공했다. Task 410에서 이 결과를
API 재호출 없이 고정 증적으로 표시했다. 그러나 Task 411에서 productNoMatched가 null로
확인되어 상품 수정 API 진입을 보류한 상태이다.

## productNoMatched null 해석

productNoMatched null은 조회 실패를 의미하지 않는다. HTTP 200 성공과
originProduct/smartstoreChannelProduct 구조는 확인되었지만, 현재 masked evidence만으로는
API 응답 안의 어떤 필드가 대상 상품번호 6597910207과 안전하게 대응되는지 확정하지
못했다. 상품 수정 API는 상품 식별이 정확해야 하므로, 현 단계에서 update API 진입은
계속 보류한다.

## 입력 ViewModel

- `TmsFastConnectionNaverProductUpdateApiEntryDecisionView` (Task 411)

## 출력 ViewModel

- `TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView`

## Task 411 → Task 412 상태 매핑

- `..._PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY` → `..._FIELD_MAPPING_REVIEW_REQUIRED`
- `..._PRODUCT_UPDATE_API_ENTRY_DECISION_ALLOWED_FOR_FUTURE_REVIEW` → `..._FIELD_MAPPING_REVIEW_OPTIONAL`
- `..._PRODUCT_UPDATE_API_ENTRY_DECISION_READY` → `..._FIELD_MAPPING_REVIEW_READY`
- `..._PRODUCT_UPDATE_API_ENTRY_DECISION_BLOCKED` → `..._FIELD_MAPPING_REVIEW_BLOCKED`
- `..._PRODUCT_UPDATE_API_ENTRY_DECISION_NOT_STARTED` → `..._FIELD_MAPPING_REVIEW_NOT_STARTED`

상태 매핑은 `Record<...>` 기반 exhaustive mapping으로 구현했다.

현재 Task 411의 실제 판단(`DEFERRED_PENDING_PRODUCT_IDENTITY`) 기준으로는 다음이 된다.

```text
TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED
```

## 8개 Field Mapping Review 그룹

1. `PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_READINESS` - 검토 화면이 준비되었는지 표시
2. `TASK_411_ENTRY_DECISION_REFERENCE` - Task 411 상품 수정 API 진입 보류 판단 참조
3. `MASKED_RESPONSE_SHAPE_REFERENCE` - Task 410의 responseShapeKeys만 참조
4. `PRODUCT_IDENTITY_FIELD_CANDIDATE_PATHS` - 상품 식별 필드 후보 경로를 값 없이 이름/경로만 표시
5. `CURRENT_MATCHING_GAP_ANALYSIS` - productNoMatched null의 원인을 매핑 미확정으로 분석
6. `UPDATE_API_ENTRY_STILL_DEFERRED_GUARD` - 상품 수정 API 진입이 계속 보류됨을 표시
7. `RAW_RESPONSE_SECRET_TOKEN_NON_EXPOSURE_GUARD` - raw response/secret/token/header/signature 미노출 표시
8. `NEXT_MASKED_SHAPE_AUGMENTATION_ROADMAP` - 다음 단계로 마스킹 shape 보강 검토 제안

## 상품 식별 필드 후보 경로

아래 후보는 확정된 응답 구조가 아니라 검토 후보이며, 값은 표시하지 않고 경로명만 표시한다.

- `smartstoreChannelProduct.channelProductNo`
- `smartstoreChannelProduct.id`
- `smartstoreChannelProduct.productNo`
- `smartstoreChannelProduct.originProductNo`
- `originProduct.originProductNo`
- `originProduct.id`
- `originProduct.productNo`

각 후보는 다음 상태를 갖는다.

- `candidatePathOnly: true`
- `actualValueRead: false`
- `actualValueDisplayed: false`
- `actualRawResponseAccessed: false`
- `matchConfirmed: false`
- `requiresMaskedShapeAugmentation: true`

candidate path만 표시하고 값은 표시하지 않았으며, 상품 식별 매핑은 미확정 상태이다.

## 추천값

- `recommendedMappingReviewDecision: NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED`
- `recommendedPrimaryGoalAchieved: NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS`
- `recommendedLookupEvidenceStatus: LOOKUP_SUCCESS_HTTP_200_MASKED_EVIDENCE_CONFIRMED`
- `recommendedTargetApi: NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- `recommendedTargetProductNo: 6597910207`
- `recommendedNextStep: NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW`
- `recommendedExecutionMode: READ_ONLY_FIELD_MAPPING_REVIEW_NO_API_RECALL`
- `recommendedDeploymentMode: UPDATE_API_ENTRY_STILL_DEFERRED_NO_UPDATE_NO_DB_WRITE`
- `recommendedSafetyMode: SAFETY_LOCKED_UNTIL_PRODUCT_IDENTITY_FIELD_MAPPING_CONFIRMED`

## 상품 수정 API 진입 보류 유지

- `productUpdateApiEntryAllowedNow: false`
- `productUpdateApiEntryDeferred: true`
- `productUpdateApiCallAllowed: false`, `priceChangeAllowed: false`, `stockChangeAllowed: false`, `dbWriteAllowed: false`
- `actualProductUpdateApiCall: false`, `actualProductUpdateExecuted: false`
- `actualPriceChange: false`, `actualStockChange: false`, `actualDbWrite: false`

## 마스킹된 response shape 보강 필요성

- `productIdentityFieldMappingRequired: true`
- `productIdentityMatchConfirmed: false`
- `maskedResponseShapeAugmentationRequired: true`
- `rawResponseReviewAllowed: false`

## raw response/secret/token/header/signature 노출 금지 준수

- `actualRawApiResponseExposure: false`, `actualRawApiResponseStored: false`
- `actualSecretExposure: false`, `actualTokenExposure: false`
- `actualAuthorizationHeaderExposure: false`, `actualSignatureExposure: false`

## Task 412에서 API 재호출 없음

- `actualNaverApiCallInTask412: false`
- `actualProductLookupApiCallInTask412: false`
- `actualProductLookupApiRecall: false`

## Task 412에서 env/process.env/secret/token 접근 없음

- `actualEnvReadInTask412: false`
- `actualEnvFileOpenInTask412: false`
- `actualProcessEnvReadInTask412: false`
- `actualSecretAccessInTask412: false`
- `actualTokenUseInTask412: false`

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 411 ViewModel을 입력으로 Task 412 Product Identity Field Mapping Review ViewModel 생성
  - GET 응답에 `tmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView` 추가
  - GET 처리 중 실제 Naver API 호출, env/process.env/secret/token/raw response 접근 없음
  - POST API는 추가하지 않음
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 412 타입 필드 추가
  - Task 411 바로 아래, Task 332 바로 위에 Task 412 패널 추가
  - 조회 1회 성공 증적, candidate path 목록(값 없이 경로명만), 상품 식별 확정 여부, 8개 그룹 요약, Task 413 로드맵, 안전 금지선 표시
  - 실행 버튼/승인 버튼/승인 입력창/form submit/POST 호출 추가 없음
  - page.tsx는 ViewModel 표시만 담당하며 실제 API를 호출하지 않음

## 검증 결과

- Task 412 신규 테스트 통과
- 인접 Task 411 / Task 410 / Task 409 ViewModel 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 413 방향

- `Task 413 - Naver 상품 조회 마스킹 응답 shape 보강 검토 화면`
