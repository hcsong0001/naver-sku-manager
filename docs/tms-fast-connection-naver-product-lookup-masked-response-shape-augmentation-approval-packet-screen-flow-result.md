# Task 414 - Naver 상품 조회 마스킹 응답 shape 보강 별도 승인 Packet

## 목적

마스킹 응답 shape 보강 수집을 실제로 수행하기 전, 어떤 범위의 재조회와 마스킹 정보 수집이
필요한지 정리하고 사용자에게 필요한 별도 승인 문구를 read-only Packet으로 안내한다.

이번 Task에서는 실제 Naver API를 재호출하지 않고, 마스킹 shape 보강 수집도 실행하지 않는다.

## 사무실 PC 작업 기준

- 작업 경로: `C:\Users\CORSAIR\Documents\naver-sku-manager`
- 기준 커밋: `cbf30ab3a297f3e84e4ae804ed2b5bda29667ae4` (Task 413 커밋)

## Task 413 마스킹 응답 shape 보강 검토 기준 상태

- 조회 1회 성공 여부: true / HTTP status: 200 / 실제 호출 수: 1
- 대상 API: `NAVER_COMMERCE_PRODUCT_LOOKUP_API` / 대상 상품번호: `6597910207`
- responseShapeKeys: `["originProduct", "smartstoreChannelProduct"]`
- productNoMatched: null
- 보강 필요 항목 수: 7
- 보강 수집 실행 여부: false
- 상품 식별 확정 여부: false
- 상품 수정 API 진입 허용 여부: false / 보류 여부: true
- 추천 다음 단계: `NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET`

## Naver API 상품 조회 1회 성공 증적

Task 409에서 HTTP 200으로 상품 조회 API 1회 호출이 성공했고, Task 410~413에서 이 증적과
후속 판단을 read-only 화면으로 유지했다.

## productNoMatched null 해석

productNoMatched null은 조회 실패가 아니라, 현재 마스킹된 증적만으로는 상품 식별을 확정하지
못했다는 의미다. 따라서 상품 수정 API 진입은 계속 보류한다.

## 마스킹 shape 보강 승인 요청 범위

- `Naver 상품 조회 API 재조회 최대 1회`
- `대상 상품번호 6597910207 고정`
- `마스킹 응답 shape 보강 수집`
- `candidate path exists 여부 수집`
- `candidate path value type 수집`
- `candidate path value masked preview last4 수집 가능`
- `candidate path equals targetProductNo boolean 수집`
- `nested key names only 수집`
- `product identity confidence score 산정`

## 승인 범위 밖 항목

- `상품 수정 API 호출`
- `가격 변경`
- `재고 변경`
- `DB write`
- `raw response 전체 표시`
- `raw response 전체 저장`
- `full product name 표시`
- `full option name 표시`
- `full seller management code 표시`
- `secret/token/header/signature 출력`
- `반복 조회`
- `다른 상품번호 조회`

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

## 필요한 별도 승인 문구

다음 단계에서 실제 마스킹 shape 보강 수집을 진행하려면 사용자가 아래 문구를 별도로 보내야 한다.

```text
Naver 상품 조회 마스킹 응답 shape 보강 수집을 별도로 승인합니다.
```

이번 화면은 승인 요청 Packet일 뿐이며, 실제 승인 수락이 아니다.
이번 화면에는 승인 입력창, 승인 버튼, submit action, POST API가 없다.

## 실제 승인 수락은 아직 없음

- `actualApprovalAccepted: false`
- `actualMaskedShapeAugmentationApprovalAccepted: false`

## 보강 수집은 아직 수행하지 않았다는 점

- `maskedShapeAugmentationCollectionPerformed: false`
- 실제 API 재호출도 수행하지 않았다.

## 상품 수정 API 진입 보류 유지

- `productIdentityMatchConfirmed: false`
- `productUpdateApiEntryAllowedNow: false`
- `productUpdateApiEntryDeferred: true`

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

## Task 414에서 API 재호출이 없다는 점

- `actualNaverApiCallInTask414: false`
- `actualProductLookupApiCallInTask414: false`
- `actualProductLookupApiRecall: false`

## Task 414에서 env/process.env/secret/token 접근이 없다는 점

- `actualEnvReadInTask414: false`
- `actualEnvFileOpenInTask414: false`
- `actualProcessEnvReadInTask414: false`
- `actualSecretAccessInTask414: false`
- `actualTokenUseInTask414: false`

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 413 ViewModel을 입력으로 Task 414 ViewModel 생성
  - GET 응답에 `tmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView` 추가
  - 실제 Naver API 호출, env/process.env/secret/token/raw response 접근 없음
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 414 타입 필드 추가
  - Task 413 바로 아래, Task 332 바로 위에 Task 414 패널 추가
  - 승인 요청 범위, 승인 범위 밖 항목, 허용/금지 데이터, 별도 승인 문구, 실제 승인 수락 false, Final Gate 로드맵을 표시
  - 실행 버튼/승인 버튼/승인 입력창/submit action/POST 호출 추가 없음

## 검증 결과

- Task 414 신규 테스트 통과
- 인접 Task 413 / Task 412 / Task 411 ViewModel 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 415 방향

- `Task 415 - Naver 상품 조회 마스킹 응답 shape 보강 실행 전 Final Gate`
