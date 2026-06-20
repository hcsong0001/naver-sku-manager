# FinalApproval UI Gate Policy

## 1. FinalApproval 생성 버튼 활성화 조건

아래 조건을 모두 만족해야만 생성 버튼 활성화가 가능합니다.

- Batch Job 상태가 APPROVED
- 모든 Batch Item 상태가 READY
- ACTIVE FinalApproval artifact가 아직 없음
- requestPayload.candidate 존재
- requestPayload.dryRunItem 존재
- 24시간 이내 NAVER_PRODUCT_COLLECTION 검증 문맥 존재
- FINAL_APPROVAL_API_ENABLED=true
- server-only system principal 설정 완료
- 사용자가 "최종 승인 artifact 생성" 의미를 명확히 확인

## 2. 버튼 비활성 조건

아래 중 하나라도 해당하면 버튼은 disabled 상태여야 합니다.

- Job 상태가 APPROVED가 아님
- Item 중 READY가 아닌 항목 존재
- ACTIVE FinalApproval이 이미 존재
- 기존 FinalApproval이 유효하며 중복 생성 위험이 있음
- validation context가 24시간 초과
- API gate가 비활성화됨
- server-only principal 미설정
- 화면이 로딩 중
- 조회 API 에러 발생

## 3. 실제 POST 호출 전 확인 modal

버튼을 나중에 활성화할 경우에도 바로 POST 호출하지 않고, 확인 modal을 거치도록 설계합니다. modal에는 다음 내용을 포함해야 합니다.

- 이 작업은 네이버 API를 호출하지 않음
- 이 작업은 EXECUTING으로 전환하지 않음
- 이 작업은 Job/Item status를 변경하지 않음
- 이 작업은 FinalApproval artifact만 생성함
- 기존 ACTIVE artifact가 있으면 생성 불가
- validationExpiresAt 이후에는 실행 자격으로 사용하면 안 됨

## 4. POST 호출 금지 범위

이번 단계와 다음 UI 연결 단계에서도 아래 항목들은 절대적으로 금지됩니다.

- 네이버 API 호출 금지
- Worker 실행 금지
- 실행 API 호출 금지
- EXECUTING 전환 금지
- Job/Item status 변경 금지
- 운영 DB에서 수동 POST 테스트 금지

## 5. UI 상태 설계

- ACTIVE artifact 있음: "이미 ACTIVE 최종 승인 Artifact가 있습니다. 현재 Batch는 최종 승인 이력이 있으므로 새 Artifact 생성은 비활성화되어 있습니다."
- artifact 없음 + 조건 충족: 생성 가능하지만 확인 modal을 먼저 띄움
- artifact 없음 + 조건 미충족: 조건 불충족 목록(체크리스트) 안내와 함께 버튼 비활성화
- validation 만료: 재검증 필요성 안내
- 조회 API 실패: 에러 메시지와 함께 버튼 비활성화
- API gate 비활성: 안전 조치로 비활성화됨을 안내

## 6. 다음 구현 단계 제안

1. disabled 버튼을 조건부 enabled 버튼으로 변경
2. POST 전 확인 modal 추가
3. Docker integration test에서 UI 호출 흐름 검증
4. 운영 DB가 아닌 테스트 DB에서만 생성 POST 검증
