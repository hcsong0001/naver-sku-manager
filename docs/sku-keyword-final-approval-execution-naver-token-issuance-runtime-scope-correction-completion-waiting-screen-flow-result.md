# Task 257: Naver Token Issuance Runtime Scope Correction Completion Waiting Screen Flow Result

## 목적
Task 256 보정 체크리스트 표시 후, 사용자가 PowerShell 세션/Next.js 프로세스/프로젝트 루트/서버 재시작을 직접 보정 완료했다고 보고하기 전까지 Env/Auth 재확인과 Token 발급으로 진행할 수 없음을 read-only로 표시.

## 추가된 패널 위치
```
Task 256 Env Auth Runtime Scope User Correction Checklist
Task 257 Runtime Scope Correction Completion Waiting   ← 신규 추가
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-runtime-scope-correction-completion-waiting-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-runtime-scope-correction-completion-waiting-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-token-issuance-runtime-scope-correction-completion-waiting-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- status: RUNTIME_SCOPE_CORRECTION_COMPLETION_WAITING
- presencePresentCount: 0 / presenceMissingCount: 3
- isTargetPresenceResultMet: false
- isUserRuntimeScopeCorrectionCompletionReported: false
- isWaitingUserRuntimeScopeCorrectionCompletion: true
- isRecheckBlockedUntilRuntimeScopeCorrection: true
- isEnvPresenceRecheckExecuted: false / isAuthKeyPresenceRecheckExecuted: false
- isEnvFileDirectlyAccessed: false / isEnvFileModified: false
- isTokenIssuanceAllowed: false / isTokenIssued: false / isTokenStored: false

## Waiting Items (23개 항목)
| 항목 | 상태 | 의미 |
|------|------|------|
| Runtime Scope User Correction Checklist (Task 256) | CORRECTION_CHECKLIST_CONFIRMED | Task 256 보정 체크리스트 확인 |
| 현재 재확인 결과 | MISSING_STILL_DETECTED | PRESENT 0 / MISSING 3 |
| 목표 결과 | TARGET_NOT_MET | PRESENT 3 / MISSING 0 미달성 |
| 사용자 Runtime Scope 보정 | WAITING_USER_CORRECTION_COMPLETION | 사용자 보정 완료 보고 대기 |
| PowerShell 세션 보정 | WAITING_USER_ACTION | 사용자 확인/보정 대기 |
| Next.js 실행 프로세스 보정 | WAITING_USER_ACTION | 사용자 확인/보정 대기 |
| 프로젝트 루트 확인 | WAITING_USER_ACTION | 사용자 확인/보정 대기 |
| 서버 재시작 | WAITING_USER_ACTION | 사용자 확인/보정 대기 |
| Env/Auth 재확인 | RECHECK_NOT_ALLOWED_YET | 보정 완료 보고 전 재확인 금지 |
| ".env" 직접 열람 | FORBIDDEN | 에이전트 직접 열람 금지 |
| ".env" 자동 수정 | FORBIDDEN | 에이전트 직접 수정 금지 |
| 인증키 값 표시 | FORBIDDEN | 값 출력 금지 |
| Secret 로그 출력 | FORBIDDEN | 로그 노출 금지 |
| Token 발급 가능 여부 | BLOCKED_BY_MISSING_ENV_AUTH | 현재 발급 불가 |
| Token 발급 | LOCKED | 아직 발급 불가 |
| Token 저장 | LOCKED | 저장 없음 |
| Naver API 호출 | LOCKED | 호출 없음 |
| 상품 조회/수정 API | LOCKED | 호출 없음 |
| 가격·재고 변경 | LOCKED | 변경 없음 |
| Worker / Queue / Adapter | LOCKED | 실행 경로 없음 |
| POST API 연결 | NOT_CONNECTED | 제출/실행 경로 없음 |
| 승인/실행 버튼 | NOT_PRESENT | 버튼 없음 |
| 현재 Task 상태 | READ_ONLY_INFO | Task 257은 보정 완료 대기 표시 전용 |

## 완료 보고 가이드 형식
```
Runtime Scope 보정 완료 보고

1. PowerShell 세션 확인 완료
2. Next.js 실행 프로세스 확인 완료
3. 프로젝트 루트 확인 완료
4. 서버/dev/build/test 프로세스 재시작 또는 재실행 완료
5. 실제 값은 공유하지 않음
6. 다음 Task에서 비노출 방식으로 PRESENT/MISSING 재확인 요청
```

## 이 패널이 아닌 것들
- 재확인 실행이 아님: `isEnvPresenceRecheckExecuted: false`, `isRecheckBlockedUntilRuntimeScopeCorrection: true`
- ".env" 접근이 아님: `isEnvFileDirectlyAccessed: false`, `isEnvFileModified: false`
- Token 발급이 아님: `isTokenIssuanceAllowed: false`, `isTokenIssued: false`, `isTokenStored: false`
- 보정 완료 보고가 아님: `isUserRuntimeScopeCorrectionCompletionReported: false`

## 다음 단계 진행 조건
사용자가 위 완료 보고 형식에 따라 보고한 후, 사용자의 별도 명시 지시가 있을 때만 다음 Task(재확인)가 진행됩니다.
