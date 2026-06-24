# Task 69 - Token First Test Separate Approval Pre-submission Review Read-only Screen Flow Result

## 작업 목적

`/dashboard/sku-keyword-draft-batches/[jobId]` 상세 화면에
"Separate Approval Pre-submission Review" read-only 패널을 추가합니다.
Task 68 (Separate Approval Request Packet) 다음에 배치되며,
실제 승인 요청 제출 전 누락/위험/오해 가능성을 사전검토하는 read-only 화면입니다.
승인 요청 제출, 실행, token 요청, API 호출 기능은 없습니다.

## 추가/수정 파일 목록

### 신규 파일

| 파일 경로 | 역할 |
|-----------|------|
| `src/services/...pre-submission-review-view.service.ts` | Pre-submission Review View Model 생성 순수 함수 |
| `src/services/...pre-submission-review-view.test.ts` | 위 서비스 85개 테스트 케이스 |
| `docs/...pre-submission-review-screen-flow-result.md` | 이 결과 문서 |

### 수정 파일

| 파일 경로 | 수정 내용 |
|-----------|-----------|
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | import + `naverAuthTokenFirstTestSeparateApprovalPreSubmissionReviewScreen` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | DraftBatchJob 타입 필드 + UI 패널 추가 |

## View Model 구조

```typescript
NaverApiTokenFirstTestSeparateApprovalPreSubmissionReviewViewModel {
  // Required True flags (9개)
  preSubmissionReviewOnly: true
  separateApprovalStillRequired: true
  executionStillForbidden: true
  tokenRequestStillForbidden: true
  naverApiCallStillForbidden: true
  operatingDbWriteStillForbidden: true
  priceStockChangeStillForbidden: true
  queueWorkerStillDisconnected: true
  postApiStillNotAdded: true

  // Content
  screenTitle: 'Token First Test Separate Approval Pre-submission Review'
  preSubmissionPhaseName: '제출 전 사전검토 단계'
  preSubmissionStatus: '미제출 (실행 금지 상태)'
  requestPacketCommit: 'd33c554'
  approvalRequestSubmitted: false
  approvalRequestSubmitButtonRendered: false
  approvalRequestSubmitButtonEnabled: false
  packetReviewItems: PacketReviewItem[]          // 4개
  missingBeforeSubmissionItems: PreSubmissionMissingItem[]  // 4개
  misunderstandingPreventionItems: PreSubmissionMisunderstandingItem[]  // 4개
  riskRecheckItems: PreSubmissionRiskRecheckItem[]  // 4개
  stillForbiddenItems: StillForbiddenPreSubmissionItem[]  // 5개
  nextStepLabel: string
}
```

## 아이템 구성

### packetReviewItems (4개)
| reviewKey | reviewStatus |
|-----------|-------------|
| PACKET_CONTENT_REVIEW | REVIEWED |
| PURPOSE_SCOPE_REVIEW | REVIEWED |
| EVIDENCE_PACKET_REVIEW | REVIEWED |
| STILL_FORBIDDEN_REVIEW | REVIEWED |

### missingBeforeSubmissionItems (4개)
| checkKey | checkLabel |
|----------|-----------|
| MISSING_APPROVAL_AUTHORITY | 승인 권한자 확인 |
| MISSING_SUBMISSION_CHANNEL | 제출 채널 확인 |
| MISSING_APPROVER_BRIEFING | 승인자 브리핑 여부 |
| MISSING_POST_APPROVAL_PLAN | 승인 이후 계획 |

### misunderstandingPreventionItems (4개)
| itemKey | itemLabel |
|---------|----------|
| REVIEW_NOT_SUBMIT | 검토 ≠ 제출 |
| APPROVED_NOT_EXECUTE | 별도 승인 ≠ 즉시 실행 |
| PACKET_NOT_LIVE | 패킷 확인 ≠ live 실행 |
| REVIEW_COMPLETE_NOT_APPROVE | 검토 완료 ≠ 승인 완료 |

### riskRecheckItems (4개)
| recheckKey | recheckLabel |
|------------|-------------|
| RISK_TOKEN_NETWORK | 인증 키 요청 위험 |
| RISK_DB_WRITE | 운영 DB write 위험 |
| RISK_EXECUTION_FLOW | 실행 흐름 위험 |
| RISK_EARLY_ACTION | 조기 실행 위험 |

### stillForbiddenItems (5개)
| forbiddenKey | forbiddenLabel |
|--------------|---------------|
| TOKEN_REQUEST_FORBIDDEN | 인증 키 요청 |
| EXTERNAL_API_CALL_FORBIDDEN | 외부 서비스 API 호출 |
| DB_WRITE_FORBIDDEN | 운영 DB write |
| PRICE_STOCK_CHANGE_FORBIDDEN | 가격·재고 변경 |
| EXECUTION_SUBMIT_FORBIDDEN | 실행·승인 제출 |

## 화면 구성 (violet 테마)

| 섹션 | 내용 |
|------|------|
| 헤더 | violet + FileCheck 아이콘 |
| 미제출 배너 | 패킷 참조 커밋 + read-only 안내 |
| 패킷 검토 상태 | 4개 그리드 카드 (REVIEWED 상태) |
| 누락 가능 항목 | amber 4개 |
| 오해 방지 항목 | sky 4개 |
| 위험 재확인 항목 | red 4개 |
| 여전히 금지되는 항목 | rose 5개 (Lock 아이콘) |
| 사전검토 안내 | violet + nextStepLabel |

## 안전 규칙 준수

| 항목 | 결과 |
|------|------|
| Pre-submission Review 저장/제출/확정/해제 버튼 없음 | ✅ |
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
