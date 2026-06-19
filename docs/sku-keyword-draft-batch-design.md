# SKU Keyword Matching Draft Batch 설계

## 목적
서버 dry-run 검증을 통과한 후보만 DRAFT 상태의 Batch로 저장하기 위한 설계. 이 기능은 네이버 API 호출 전 사용자가 실제 Batch로 넘어갈 항목을 안전하게 최종 확정하고 이력을 남기기 위함이다.

## 현재 단계
아직 DB 저장 없음.
아직 네이버 API 호출 없음.
아직 NaverApiBatchJob 저장 없음.

## 기존 구현 구조
- **Draft 후보 미리보기**: 사용자가 파일 및 키워드를 기반으로 매칭 후보를 확인.
- **프론트 Batch dry-run preview**: 선택된 후보들이 Batch로 넘어갈 수 있는지 프론트엔드에서 1차 예측.
- **서버 Batch dry-run preview API**: 실제 저장 전 서버 로직에서 `executable`, `blocked` 등의 조건을 2차로 정밀 검증.

## 기존 모델 (Schema) 검토
`prisma/schema.prisma` 확인 결과 `NaverApiBatchJob` 및 `NaverApiBatchJobItem` 모델이 이미 존재함.
- `NaverApiBatchJob`: `status` 필드에 `DRAFT` 상태 지정 가능 (`NaverApiBatchJobStatus.DRAFT`). `previewSummary` (JSON) 필드를 통해 요약 정보 저장 가능.
- `NaverApiBatchJobItem`: `storeId`, `channelProductNo` 필드 존재. 
- 상품/옵션/추가상품 구분은 `targetType`과 `targetId`에 저장 가능.
- 변경 전/후 가격 및 재고는 `previewBefore`, `previewAfter` JSON 필드에 저장 가능.
- **결론**: 현재 Prisma schema 변경 없이 DRAFT 저장이 충분히 가능함.

## DRAFT 저장 안전 조건

실제 DRAFT 저장 기능을 구현할 때의 필수 안전 조건은 다음과 같다.

- **Hard Blocker (저장 불가)**
  1. 서버 dry-run API를 통과하지 못한 후보 (executable === false)
  2. `draftCreatable === false` 인 시스템 차단 후보
  3. `CURRENT_PRICE_UNAVAILABLE` (현재 가격 문맥 없음)
  4. `CURRENT_STOCK_UNAVAILABLE` (현재 재고 문맥 없음)
  5. `NEEDS_CONTEXT` (문맥 부족)

- **Manual Approval Required (별도 승인 필요 또는 저장 금지)**
  1. `HIGH` risk 후보 (위험 요인이 있는 경우 기본적으로 저장을 막거나 경고 후 강제 승인 필요)
  2. `optionValue fallback` 매칭 후보 (정확하지 않은 매칭일 수 있으므로 2차 확인 필요)

- **Warning (저장 가능하지만 사용자 경고 노출)**
  1. `CHANNEL_ID_UNAVAILABLE`: 정보성 경고로 저장 가능.
  2. `UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW` 사용 후보: 실제 스토어의 현재 값과 업로드된 엑셀 값이 다를 수 있으므로 **stale warning 필수 표시**.

- **저장 가능**
  1. 위 Blocker가 없고 `executable === true` 인 모든 후보
  2. `selectedCandidateIds` 기준으로 사용자가 명시적으로 선택한 후보에 한함.

## DRAFT Batch 저장 흐름 설계

1. 사용자가 Preview 실행
2. Draft 후보 미리보기 실행
3. OPTION current context 파일이 있으면 Preview 전용으로 보강
4. 사용자가 후보 선택
5. Batch dry-run 서버 검증 실행
6. executable 후보만 DRAFT 저장 후보로 표시
7. 사용자가 “DRAFT 저장”을 누르기 전 최종 확인
8. 서버 API에 저장 요청, 서버에서 다시 dry-run 정밀 검증 수행
9. 검증을 통과한 항목에 대해 `NaverApiBatchJob` (status=DRAFT) 생성
10. 각 항목을 `NaverApiBatchJobItem` (status=DRAFT)로 생성
11. 네이버 API 호출은 절대 하지 않음

## 향후 API 설계 초안

`POST /api/sku-matching/draft-batch/save-draft`

**요청 (Request):**
```ts
type SaveDraftBatchRequest = {
  dryRunId?: string;
  candidates: SkuKeywordBulkLikeCandidate[]; // 또는 SkuKeywordDraftBatchDryRunPreviewItem[]
  selectedCandidateIds: string[];
  confirmSaveDraftOnly: true; // 안정성 확보를 위한 명시적 플래그
};
```

**응답 (Response):**
```ts
type SaveDraftBatchResponse = {
  ok: boolean;
  jobId?: string;
  status: "DRAFT";
  savedItemCount: number;
  blockedItemCount: number;
  warnings: string[];
};
```

*주의: 저장 API는 DB 트랜잭션 내에서 처리되며, 저장 직전에 서버에서 다시 dry-run 검증을 수행하여 블로킹된 항목은 저장하지 않아야 한다.*

## 향후 UI 설계 초안

**추가할 버튼:** `DRAFT Batch 저장` 또는 `검토용 Batch 저장`
*(금지 버튼명: 실행, 적용, 네이버 반영, 가격 변경, 재고 변경, 배치 실행 등)*

**UI 안전 문구:**
> "이 작업은 DRAFT 상태로만 저장됩니다. 네이버 API 호출이나 스마트스토어 가격/재고 변경은 수행하지 않습니다."

**저장 전 최종 확인 표시 (모달 또는 하단 패널):**
- 저장 대상 후보 수 (Executable)
- 저장 제외 후보 수 (Blocked)
- 경고 후보 수 (Risk/Warnings)
- 업로드 문맥 사용 후보 수 (Stale warning 필요)
- optionValue fallback 매칭 여부
- 현재 가격/재고 문맥 부족 여부 (명확한 차단 사유)
- **네이버 API 호출 없음 안내 (필수)**

## 단계별 개발 계획
1. 설계 문서 작성 (현재 완료)
2. 저장 타입 정의 및 API 라우트 스캐폴딩
3. DRAFT 저장 API (Server Action 또는 Route Handler) 구현
4. UI DRAFT 저장 버튼 및 저장 재확인 모달 추가
5. 저장 성공 후 결과/목록 화면으로 이동 또는 표시
6. 실제 API 호출 및 실행은 DRAFT가 생성된 이후, 별도의 프로세스와 화면에서 진행

## 절대 금지 사항
초기 단계에서 네이버 API 호출, 가격/재고 실제 수정, LIVE adapter 구현, Batch 상태를 곧바로 EXECUTING으로 넘기는 행위는 절대 금지한다.

## 장기 확장: 검색광고 API 연동 로드맵
TMS 후반 로드맵에서는 네이버 검색광고 API를 연동하여 광고비, 클릭수, 전환, ROAS를 상품/SKU/재고/마진과 함께 분석한다.

**초기 범위:**
- 읽기 전용 광고 리포트 수집
- 캠페인/광고그룹/키워드 성과 조회
- 상품/SKU와 광고 성과 연결
- 재고 부족 상품에 광고비가 쓰이는지 경고
- 마진이 낮은 상품의 광고 효율 분석 (방어적 운영)

**초기 금지 (안전 규칙):**
- 광고 자동 수정 금지
- 입찰가 자동 변경 금지
- 캠페인 예산 변경 금지
