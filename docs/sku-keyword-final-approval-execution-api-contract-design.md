# FinalApproval Execution API Contract Design

이 문서는 추후 구현될 `FinalApproval`의 `실행(Execute) API`에 대한 인터페이스 규격, 데이터 구조, 그리고 동시성 및 부수효과 통제를 위한 안전장치와 역할 분담을 정의하는 설계 명세서입니다.

> [!NOTE]
> **현재 실행 API는 구현되지 않았습니다.** 이 문서는 향후 API 라우트 엔드포인트를 구현할 때 준수해야 할 필수적인 원칙을 규정하기 위한 목적입니다. 실제 네이버 API 호출 코드, 상태 전이(EXECUTING) 코드, API 핸들러 코드는 현 단계에서 철저히 금지되어 있습니다.

## 1. 실행 API의 목적
- 관리자 UI(프론트엔드)에서 트리거한 "최종 실행(LIVE)" 요청을 접수하는 관문 역할.
- 사용자의 권한 및 의도를 재확인하고, FinalApproval 객체의 무결성 및 해시를 검증함.
- 네이버 API를 즉시 호출하는 대신, 백그라운드 Worker에 실행 요청을 대기열(Enqueue)에 밀어넣고 202 Accepted를 반환함.

## 2. 실행 API가 아직 구현되지 않았다는 명시
현재 저장소에는 Next.js API Route 엔드포인트 로직이나 실행 핸들러가 **전혀 존재하지 않습니다.** 이 명세는 향후 백엔드 진입점을 설계할 때 지켜야 할 가이드라인입니다.

## 3. endpoint 후보
- **POST** `/api/smartstore/batch-jobs/[jobId]/final-approval/execute`
- (대안) **POST** `/api/final-approvals/[finalApprovalId]/execute`

## 4. request body contract
UI에서 프롬프트 및 사용자 의도(Confirmation)를 반영하는 파라미터를 필수로 전달받습니다.
```typescript
type ExecuteFinalApprovalRequest = {
  jobId: string;
  finalApprovalId: string;
  payloadHash: string; // 클라이언트가 알고 있는 최종 해시
  validationSnapshotHash: string;
  confirmFlag: boolean; // 사용자 동의(Alert 모달 확인) 여부
  requestedBy: string; // 호출 Actor
};
```

## 5. response body contract
비동기 처리 특성상 실행 완료를 기다리지 않고 Worker Enqueue 성공 여부만 반환합니다.
```typescript
type ExecuteFinalApprovalResponse = {
  ok: boolean;
  message: string;
  enqueuedAt: string;
  taskId: string | null; // Worker 대기열의 추적 ID
  errors: Array<{
    code: string;
    message: string;
  }>;
};
```

## 6. actor / permission / confirmation 조건
- **Actor/Permission**: 세션 검증을 통해 관리자 등급(Admin) 권한 보유자만 호출 가능하도록 제어.
- **Confirmation**: `confirmFlag === true` 조건이 충족되지 않으면 400 Bad Request로 튕겨내어 실수에 의한 라이브 반영을 방지.

## 7. FinalApproval 유효성 검증 순서
API 핸들러는 Enqueue 직전에 반드시 DB를 조회하여 다음을 검사해야 합니다.
1. `FinalApproval`이 존재하는지 확인
2. `FinalApproval.status`가 `ACTIVE` 인지 확인 (SUPERSEDED 등 거부)
3. `validationExpiresAt`이 지나지 않았는지 검사

## 8. Job status / Item status 검증 조건
- **Job Status**: `APPROVED` 상태여야만 API 요청이 수락됨.
- **Item Status**: 하위 `JobItem`에 `READY` 상태의 항목이 1건 이상 존재해야 함.

## 9. payloadHash / validationSnapshotHash 검증 조건
- 클라이언트가 전달한 `payloadHash` 및 `validationSnapshotHash`가 현재 서버(DB)에 저장된 `FinalApproval`의 해시와 정확히 일치하는지 비교.
- 불일치 시, 승인 이후 변경 사항이 생긴 것으로 간주하여 409 Conflict 또는 400 Bad Request 처리.

## 10. 중복 실행 방지 및 idempotency 조건
- 여러 사용자가 동시에 '실행'을 클릭하는 경우를 대비해, Redis Lock 또는 DB의 낙관적 락을 통해 1회만 Enqueue 되도록 통제(Idempotency).
- 이미 Enqueue된 JobId는 중복 수락하지 않음.

## 11. Worker enqueue와 API의 책임 분리
- **API의 책임**: 요청 수신, Actor 권한 검증, 데이터베이스 유효성 및 Hash 정합성 초기 판별, Worker 대기열에 Event 발행 후 빠른 응답 반환.
- **Worker의 책임**: 대기열에서 꺼낸 후 상태 전이(`EXECUTING`), 외부 망(Naver API) 통신, 최종 결과 `SUCCESS/FAILED` 마킹.

## 12. API가 직접 네이버 API를 호출하지 않아야 하는 원칙
- 브라우저 HTTP Connection Timeout 방지 및 동기적 에러 증폭을 막기 위해 API 핸들러에서 직접 네이버 API를 호출하는 로직(Live Adapter 직접 주입)은 **절대 금지**됩니다.

## 13. dry-run과 live execution의 경계
- 실행 API는 철저히 **Live Execution**의 시작점입니다. 단, 내부 검증 파이프라인은 Dry-run orchestration(순수 함수)의 검증 로직을 재사용하여 API 단에서 사전에 실패를 걸러내는 용도로 활용할 수 있습니다.

## 14. audit log / execution log 필요성
- API 호출 즉시 "누가, 언제, 어떤 Hash를 가지고 실행을 명령했는지"를 Audit Log 테이블(또는 Audit JSON 필드)에 기록해야 합니다.
- 시스템 무결성 증빙 자료로 활용됨.

## 15. 운영 DB 보호 조건
- 읽기 작업 시 불필요한 Full Table Scan이나 Join을 최소화할 수 있도록 인덱스가 최적화된 조건(`jobId` 및 `finalApprovalId`)으로 단일 조회.
- Transaction 블록이 API의 HTTP 응답 시간 동안 길게 열려있지 않도록 설계.
- 로컬 개발/테스트 시 `DATABASE_URL` 안전장치 동작 필수.

## 16. 실제 구현 전 승인 필요 항목
- [ ] Next.js App Router (또는 Pages Router) 기반 엔드포인트 URL 컨벤션 확정
- [ ] 권한 증명(Session/JWT) 미들웨어 규격
- [ ] 프론트엔드-백엔드 간 `confirmFlag` 상호 동의 UI 설계안 확정
- [ ] Worker 대기열(Queue) 아키텍처 연동 규격

## 17. 다음 단계 추천 순서
1. **API Dummy 핸들러 구현**: 검증 로직만 수행하고 실제 Enqueue는 생략하는 Mock 엔드포인트 개발.
2. **Worker 아키텍처 연동**: Message Queue 인프라 구축 및 API의 Enqueue 로직 연결.
3. **프론트엔드 연동**: 실행 모달 및 버튼의 API Fetch 함수 연동 및 진행 상태 폴링 로직 구현.
