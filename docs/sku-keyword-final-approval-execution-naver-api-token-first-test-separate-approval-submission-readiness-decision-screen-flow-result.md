# Task 70 - Token First Test Separate Approval Submission Readiness Decision Read-only Screen Flow Result

## 작업 목적

`/dashboard/sku-keyword-draft-batches/[jobId]` 상세 화면에
"Separate Approval Submission Readiness Decision" read-only 패널을 추가합니다.
Task 69 (Pre-submission Review) 다음에 배치되며,
실제 승인 요청 제출이 아닌 제출 가능성 판단을 read-only로 표시하는 화면입니다.
승인 요청 제출, 실행, token 요청, API 호출 기능은 없습니다.

## 추가/수정 파일 목록

### 신규 파일

| 파일 경로 | 역할 |
|-----------|------|
| `src/services/...submission-readiness-decision-view.service.ts` | Submission Readiness Decision View Model 생성 순수 함수 |
| `src/services/...submission-readiness-decision-view.test.ts` | 위 서비스 84개 테스트 케이스 |
| `docs/...submission-readiness-decision-screen-flow-result.md` | 이 결과 문서 |

### 수정 파일

| 파일 경로 | 수정 내용 |
|-----------|-----------|
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | import + `naverAuthTokenFirstTestSeparateApprovalSubmissionReadinessDecisionScreen` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | DraftBatchJob 타입 필드 + UI 패널 추가 |

## View Model 구조

```typescript
NaverApiTokenFirstTestSeparateApprovalSubmissionReadinessDecisionViewModel {
  // Required True flags (9개)
  submissionDecisionReviewOnly: true
  separateApprovalStillRequired: true
  executionStillForbidden: true
  tokenRequestStillForbidden: true
  naverApiCallStillForbidden: true
  operatingDbWriteStillForbidden: true
  priceStockChangeStillForbidden: true
  queueWorkerStillDisconnected: true
  postApiStillNotAdded: true

  // Content
  screenTitle: 'Token First Test Separate Approval Submission Readiness Decision'
  submissionDecisionPhaseName: '제출 준비 판단 단계'
  submissionDecisionStatus: '제출 불가 (추가 확인 필요 상태)'
  preSubmissionReviewCommit: '9568fac'
  approvalRequestSubmitted: false
  approvalRequestSubmissionAllowed: false
  approvalRequestSubmitButtonRendered: false
  approvalRequestSubmitButtonEnabled: false
  readinessDecisionItems: ReadinessDecisionItem[]          // 5개
  submissionBlockedReasonItems: SubmissionBlockedReasonItem[]  // 4개
  unresolvedBeforeSubmissionItems: UnresolvedBeforeSubmissionItem[]  // 4개
  postSubmissionStillForbiddenItems: PostSubmissionStillForbiddenItem[]  // 5개
  nextStepLabel: string
  submissionReadinessDecisionSaveButtonRendered: false
  submissionReadinessDecisionSaveButtonEnabled: false
  submissionReadinessDecisionConfirmButtonRendered: false
  submissionReadinessDecisionConfirmButtonEnabled: false
}
```

## 아이템 구성

### readinessDecisionItems (5개)
| decisionKey | decisionStatus |
|-------------|---------------|
| CURRENT_JUDGMENT | NOT_READY |
| SUBMISSION_STATUS | PENDING |
| SUBMISSION_FEASIBILITY | CONDITIONAL |
| POST_SUBMISSION_EXECUTION | NOT_READY |
| SUBMISSION_CHANNEL | PENDING |

### submissionBlockedReasonItems (4개)
| reasonKey | reasonLabel |
|-----------|------------|
| BLOCKED_NO_APPROVAL_AUTHORITY | 승인 권한자 미지정 |
| BLOCKED_NO_SUBMISSION_FUNCTION | 제출 기능 없음 |
| BLOCKED_EXECUTION_LOCK_ACTIVE | 실행 잠금 활성화 중 |
| BLOCKED_SAFETY_GUARD_ACTIVE | 안전 잠금 유지 중 |

### unresolvedBeforeSubmissionItems (4개)
| itemKey | itemLabel |
|---------|----------|
| UNRESOLVED_APPROVER_IDENTIFICATION | 승인 권한자 확인 미완료 |
| UNRESOLVED_SUBMISSION_TIMING | 제출 시점 미결정 |
| UNRESOLVED_POST_APPROVAL_PLAN | 승인 이후 계획 미확인 |
| UNRESOLVED_APPROVER_BRIEFING | 승인자 브리핑 미완료 |

### postSubmissionStillForbiddenItems (5개)
| forbiddenKey | forbiddenLabel |
|--------------|---------------|
| POST_SUBMISSION_TOKEN_FORBIDDEN | 인증 키 요청 |
| POST_SUBMISSION_API_CALL_FORBIDDEN | 외부 서비스 API 호출 |
| POST_SUBMISSION_DB_WRITE_FORBIDDEN | 운영 DB write |
| POST_SUBMISSION_EXECUTION_FORBIDDEN | 실행 흐름 연결 |
| POST_SUBMISSION_PRICE_STOCK_FORBIDDEN | 가격·재고 변경 |

## 화면 구성 (rose 테마)

| 섹션 | 내용 |
|------|------|
| 헤더 | rose + ShieldAlert 아이콘 |
| 참조 커밋 배너 | preSubmissionReviewCommit + 제출 불가 안내 |
| 제출 준비 판단 요약 | 5개 상태 카드 (NOT_READY/PENDING/CONDITIONAL) |
| 제출 보류 사유 / 제출 전 해소 필요 항목 | 2-column 그리드 |
| 제출 후에도 여전히 금지 | rose 5개 (Lock 아이콘, 3-column 그리드) |
| 제출 준비 판단 안내 | rose + nextStepLabel |

## 안전 규칙 준수

| 항목 | 결과 |
|------|------|
| Submission Readiness Decision 저장/제출/확정/해제 버튼 없음 | ✅ |
| 승인 요청 제출 버튼 없음 | ✅ |
| 실행 버튼 없음 | ✅ |
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
| Queue/Worker 실행 없음 | ✅ |
| package.json/lock 변경 없음 | ✅ |
| Prisma schema/migration 변경 없음 | ✅ |
| page.tsx 전체 재저장 없음 | ✅ |
| stash pop/apply 없음 | ✅ |

## 테스트 결과

- 테스트 파일: 84개 전체 통과 (fail 0)
