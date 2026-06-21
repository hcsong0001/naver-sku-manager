# FinalApproval LIVE Adapter Contract Design

이 문서는 추후 구현될 `FinalApproval`의 `LIVE Adapter`에 대한 인터페이스 규격, 입출력 구조, 그리고 네이버 쇼핑 파트너 API 호출을 제어하는 제반 원칙과 안전장치를 정의하는 설계 명세서입니다.

> [!NOTE]
> **현재 LIVE Adapter는 구현되지 않았습니다.** 이 문서는 향후 어댑터를 구현할 때 준수해야 할 필수적인 원칙을 규정하기 위한 목적입니다. 실제 네이버 API 호출 코드, 상태 전이(EXECUTING) 코드 등은 현 단계에서 철저히 금지되어 있습니다.

## 1. LIVE adapter의 목적
- 순수 함수(`buildFinalApprovalExecutionPlan`)가 검증 및 변환을 완료하여 생성한 `FinalApprovalExecutionPlan`을 실제 네이버 상거래(파트너) API의 페이로드로 매핑하여 호출함.
- 네트워크 요청을 담당하며, 요청의 성공/실패, 에러 세부 내용 등을 통합된 출력 컨트랙트로 반환함.
- 비즈니스 로직(검증, 상태 관리 등)과 인프라스트럭처(네트워크 계층)를 완전히 분리함.

## 2. LIVE adapter가 아직 구현되지 않았다는 명시
현재 저장소에는 네이버 파트너 API 호출을 담당하는 Live Adapter 로직이 **존재하지 않습니다.** 이 명세는 향후 네트워크 모듈을 도입할 때 지켜야 할 가이드라인입니다.

## 3. dry-run adapter와 LIVE adapter의 차이
- **Dry-run Adapter**: 외부 요청을 수행하지 않으며, 단지 로깅 및 예상되는 성공 결과를 모방(Mock)하여 즉시 반환함. 네트워크 에러가 발생하지 않음.
- **LIVE Adapter**: 런타임 환경에서 실제로 네이버 쇼핑 파트너 API 엔드포인트(HTTP/REST)로 패킷을 전송함. 통신 과정에서의 레이턴시, Rate Limit, HTTP Status 에러가 동반되며, 부수 효과(실제 상품 정보 갱신)를 일으킴.

## 4. LIVE adapter 입력 contract
LIVE Adapter는 순수 함수가 산출한 객체를 인자로 받습니다.
```typescript
type FinalApprovalLiveAdapterInput = {
  plan: FinalApprovalExecutionPlan;
  options: {
    timeoutMs?: number;
    maxRetries?: number;
    idempotencyKeyPrefix: string;
  };
};
```
순수 함수에서 도출된 `plan.items` 목록의 `naverApiPayloadCandidate` 구조를 실제 HTTP Body로 사용합니다.

## 5. LIVE adapter 출력 contract
성공, 실패, 그리고 부분 성공(여러 건 전송 시 일부만 성공한 경우)을 아우르는 구조화된 결과를 반환합니다.
```typescript
type FinalApprovalLiveAdapterResult = {
  ok: boolean;
  totalItems: number;
  successCount: number;
  failureCount: number;
  results: Array<{
    jobItemId: string;
    finalApprovalItemId: string;
    status: 'SUCCESS' | 'FAILED';
    providerResponseCode: string | null;
    providerErrorMessage: string | null;
    timestamp: string;
  }>;
};
```

## 6. 네이버 API 호출 전 safety guard
- **환경 변수 통제**: `NODE_ENV === 'production'` 이외의 환경(로컬, 테스트)에서 실행될 경우, 요청을 차단하고 Error를 Throw하는 Hard-block 로직을 어댑터 최상단에 배치해야 합니다.
- **Circuit Breaker**: 누적된 API 오류 시 백오프(Backoff) 및 일시 차단을 수행하여 네이버 측의 영구 차단 조치를 방지해야 합니다.

## 7. FinalApproval / Job / Item 유효성 검증과의 관계
- LIVE Adapter는 자체적으로 DB를 조회하거나 검증 로직을 다시 타지 않습니다.
- 사전에 Worker 로직 또는 오케스트레이터가 `ACTIVE` 승인, `APPROVED` Job, `READY` Item인지 **모든 DB 유효성을 완전히 확인한 후**에만 Adapter를 호출해야 합니다.

## 8. payloadHash / validationSnapshotHash 검증과의 관계
- Adapter가 전달받는 `FinalApprovalExecutionPlan` 내부에는 이미 Hash 검증을 통과했다는 `validation` 객체가 포함되어 있습니다.
- 이 검증이 `true`로 보장되지 않은 객체는 LIVE Adapter의 입력으로 제공되어서는 안 됩니다.

## 9. retry 가능 오류와 retry 불가 오류 구분
- **Retry 가능 (Transient Errors)**: HTTP 500, 502, 503, 504 (네트워크/서버 장애), 네이버 파트너 API의 특정 Rate Limit 초과 (HTTP 429). 백오프 전략을 통해 재시도 대상이 됩니다.
- **Retry 불가 (Fatal Errors)**: HTTP 400 (파라미터/페이로드 오류), 401/403 (권한, 토큰 오류), 404 (존재하지 않는 상품). 즉시 `FAILED` 처리하고 로깅해야 합니다.

## 10. idempotency key 또는 중복 실행 방지 전략
- 네이버 API가 Idempotency(멱등성) 키를 헤더를 통해 지원하는 경우, 어댑터 호출 시 고유 식별자(예: `JobItemId + timestamp`)를 주입해야 합니다.
- 지원하지 않을 경우, DB에 해당 `JobItem` 상태가 `SUCCESS`로 기록된 경우를 필터링하는 아키텍처(Orchestrator 측)와의 긴밀한 연계가 필요합니다.

## 11. audit log / execution log 연계 원칙
- 어댑터는 DB 로깅 책임이 없으며, 오직 `LiveAdapterResult`를 반환합니다.
- 반환받은 Orchestrator 또는 Worker가 해당 결과를 기반으로 네이버 API의 Request/Response 스니펫을 포함한 Execution Log 및 Audit Log를 DB에 적재해야 합니다.

## 12. partial success 처리 원칙
다수의 아이템을 묶어서(Bulk/Batch API) 전송하는 구조일 경우, 네이버 측에서 `207 Multi-Status` 또는 배열 응답을 줄 수 있습니다.
- 어댑터 내부에서 이 배열을 파싱하여, 개별 `JobItem` 별로 성공/실패 여부를 분할 맵핑한 뒤 출력 Contract인 `results` 배열에 담아 반환해야 합니다.

## 13. 운영 DB write와 외부 API 호출 순서 원칙
외부 API 호출과 데이터베이스의 트랜잭션은 본질적으로 분산되어 있습니다.
1. DB Write (1): `JobItem` 상태를 `EXECUTING`으로 업데이트 및 커밋. (여기서부터 중복 호출 방지)
2. **외부 API 호출**: LIVE Adapter를 통한 네트워크 요청.
3. DB Write (2): API 응답 수신 후, 결과를 바탕으로 `SUCCESS` 또는 `FAILED` 로 업데이트 및 Execution Log 적재.

## 14. 실제 구현 전 승인 필요 항목
- [ ] 네이버 커머스 파트너 API 엔드포인트 및 권한 증명(토큰/시크릿) 구조 검토
- [ ] Rate Limit 가이드라인 파악 (초당 허용 요청 수 등)
- [ ] `FinalApprovalLiveAdapterResult` 타입 정의 구체화
- [ ] API 호출 실패 시의 알림(Slack Webhook 등) 채널 및 운영 프로세스 설계

## 15. 다음 단계 추천 순서
1. **API Dummy Mock 설계**: 실제 네트워크 호출 전, 의도적으로 4xx/5xx를 발생시키는 Mock 어댑터 구현 및 단위 테스트
2. **Worker 아키텍처 구축**: 백그라운드 Worker 데몬 설계 및 상태 전이(`EXECUTING`, `SUCCESS` 등) 연동
3. **API & UI 연동**: 프론트엔드 API 엔드포인트 연동 및 관리자 전용 대시보드의 실행 및 추적 기능 개발
