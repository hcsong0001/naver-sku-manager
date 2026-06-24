# Task 53 - Token First Test Approval Decision Summary Read-only Screen Flow Result

## 작업 목적

`/dashboard/sku-keyword-draft-batches/[jobId]` 상세 화면의 Token First Test 검토 영역에
"Approval Decision Summary" read-only 패널을 추가합니다.
Approval Readiness Checklist(Task 52) 다음, Manual Approval Checklist 직전에 위치하며,
지금까지 쌓인 모든 read-only 검토 결과를 바탕으로
**"현재 결론은 실행 불가이며, 별도 승인 전 검토 단계"**라는 상태를 한눈에 보여줍니다.
실제 승인 저장, 승인 요청 제출, 실행 연결 기능은 존재하지 않습니다.

## 추가/수정 파일 목록

### 신규 파일

| 파일 경로 | 역할 |
|-----------|------|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-decision-summary-view.service.ts` | Approval Decision Summary View Model 생성 순수 함수 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-decision-summary-view.test.ts` | 위 서비스에 대한 79개 테스트 케이스 |
| `docs/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-decision-summary-screen-flow-result.md` | 이 결과 문서 |

### 수정 파일

| 파일 경로 | 수정 내용 |
|-----------|-----------|
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `buildNaverApiTokenFirstTestApprovalDecisionSummaryView` import 추가 + `naverAuthTokenFirstTestApprovalDecisionSummaryScreen` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | `DraftBatchJob` 타입에 `naverAuthTokenFirstTestApprovalDecisionSummaryScreen` 추가 + UI 패널 렌더링 추가 |

## View Model 구조

```typescript
NaverApiTokenFirstTestApprovalDecisionSummaryViewModel {
  // Required True flags (9개)
  approvalDecisionSummaryCreated: true
  displayOnly: true
  readOnly: true
  executionLocked: true
  summaryIsReadOnly: true
  currentDecisionIsNotAllowed: true
  manualReviewRequired: true
  requiresSeparateLiveApproval: true
  tokenTestStillNotAllowed: true

  // View content
  title: 'Token First Test Approval Decision Summary'
  summaryLabel: '최종 결론 요약 (read-only — 실행 불가 상태)'
  currentDecision: '실행 불가'
  currentPhase: '별도 승인 전 검토 단계'
  reviewedPanelCount: 12
  allPanelsReadOnly: true
  decisionItems: DecisionSummaryItem[]  // 7개
  summaryNote: string

  // Required False flags (추가: decisionSaveButton 2개)
  executionButtonRendered: false
  approvalButtonRendered: false
  decisionSaveButtonRendered: false
  decisionSaveButtonEnabled: false
  checklistSaveButtonRendered: false
  formRendered: false
  ... (이하 동일)
}
```

## Decision Summary Items (7개)

| id | itemKey | currentState |
|----|---------|--------------|
| 1 | EXECUTION_STATUS | 유지 중 (실행 불가) |
| 2 | TOKEN_REQUEST_STATUS | 차단 유지 (요청 불가) |
| 3 | DB_WRITE_STATUS | 차단 유지 (write 불가) |
| 4 | APPROVAL_REQUEST_STATUS | 아직 제출 불가 / 저장 불가 |
| 5 | REVIEW_FLOW_STATUS | 12개 read-only 패널 검토 완료 |
| 6 | NEXT_ACTION | 별도 승인 기준 검토 |
| 7 | OVERALL_CONCLUSION | 실행 불가 / 별도 승인 전 검토 단계 유지 |

모든 item: `isReadOnly: true`, `isDecisionEditable: false`

## 화면 흐름 연결 방식

```
렌더링 순서 (page.tsx):
[Task 49] Review Hub Navigation          — Token First Test 영역 상단 목차
[Task 50] Review Section Layout          — 검토 전용 영역 안내
[Task 41] Readiness Screen               — 준비 상태 확인
[Task 42] Final Confirmation Gate        — 최종 확인 게이트
[Task 43] Action Lock                    — 실행 잠금 상태
[Task 44] Safety Review                  — 안전 검토 항목
[Task 45] Safe Next Step Guide           — 다음 단계 가이드
[Task 46] Separate Approval Packet       — 별도 승인 패킷
[Task 47] Approval Evidence Timeline     — 안전 검토 타임라인
[Task 48] Approval Console               — 전체 흐름 콘솔 요약
[Task 51] Separate Approval Request Draft — 별도 승인 요청 초안
[Task 52] Approval Readiness Checklist   — 승인 준비 상태 체크리스트
[Task 53] Approval Decision Summary     ← 신규 추가 (Checklist 다음, Manual Checklist 직전)
Manual Approval Checklist Panel
BatchJob 실행 결과
```

## 화면 구성 요소

| 영역 | 내용 |
|------|------|
| 헤더 | 황색(amber) ShieldAlert 아이콘 + "Token First Test Approval Decision Summary" |
| 최종 결론 배너 | AlertTriangle + summaryLabel + 3개 컬러 뱃지(현재 결론/현재 단계/검토 완료 패널 수) |
| 결론 항목 (7개) | 번호 + itemLabel + currentState 배지(상태에 따라 red/green/amber) + read-only 태그 |
| 최종 안내 | Info 아이콘 + summaryNote |

## 안전 규칙 준수 항목

| 항목 | 결과 |
|------|------|
| 실행 버튼 없음 | ✅ |
| 승인 요청 제출 버튼 없음 | ✅ |
| 승인 버튼 없음 | ✅ |
| 체크리스트 저장 버튼 없음 | ✅ |
| 승인 결정 저장 버튼 없음 | ✅ |
| form submit 없음 | ✅ |
| POST API 없음 | ✅ |
| 실제 Naver API 호출 없음 | ✅ |
| access/refresh token 요청 없음 | ✅ |
| token 발급 없음 | ✅ |
| Authorization/Bearer 헤더 없음 | ✅ |
| endpoint URL/path 원문 없음 | ✅ |
| fetch/axios/http client 신규 없음 | ✅ |
| 운영 DB write 없음 | ✅ |
| Prisma mutation 없음 | ✅ |
| 가격/재고 변경 없음 | ✅ |
| 상품 조회/수정 API 호출 없음 | ✅ |
| Queue/Worker 실행 없음 | ✅ |
| package.json/lock 변경 없음 | ✅ |
| Prisma schema/migration 변경 없음 | ✅ |
| Task 40 목록 페이지 수정 없음 | ✅ |
| stash pop/apply 없음 | ✅ |
