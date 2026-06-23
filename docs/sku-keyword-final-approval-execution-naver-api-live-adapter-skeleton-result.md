# Naver API Live Adapter Skeleton 구현 결과

## 작업 목표

실제 Live Adapter 구현에 들어가기 전, Adapter 구조/타입/Factory 연결만 준비하고 호출 시 항상 DISABLED/NOT_IMPLEMENTED 결과만 반환하도록 skeleton 구현.
실제 Naver API 호출은 이 단계에서 절대 불가능한 상태로 유지.

## 구현 파일

| 파일 | 역할 | 신규/수정 |
|------|------|----------|
| `src/services/sku-keyword-final-approval-execution-naver-api-live-adapter-skeleton.service.ts` | skeleton 서비스 (3개 함수) | 신규 |
| `src/services/sku-keyword-final-approval-execution-naver-api-live-adapter-skeleton.test.ts` | 32개 테스트 케이스 | 신규 |
| `src/services/sku-keyword-final-approval-execution-naver-api-adapter-factory.service.ts` | `live-skeleton` 모드 지원 추가 | 수정 |
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `liveAdapterSkeletonStatus` 필드 추가 | 수정 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | `LiveAdapterSkeletonStatus` 타입 추가, "Live Adapter 준비 상태" 섹션 추가 | 수정 |
| `docs/sku-keyword-final-approval-execution-naver-api-live-adapter-skeleton-result.md` | 결과 문서 | 신규 |

## Live Adapter skeleton 동작 방식

### 3개 순수 함수

| 함수 | 역할 |
|------|------|
| `buildLiveAdapterSkeletonDisabledResult(input?)` | 항상 DISABLED 결과 반환 (핵심 빌더) |
| `runNaverApiLiveAdapterSkeleton(input)` | `buildLiveAdapterSkeletonDisabledResult`의 named alias |
| `createNaverApiLiveAdapterSkeleton()` | `NaverApiAdapterPort`를 만족하는 skeleton adapter 반환 |

### `createNaverApiLiveAdapterSkeleton()` — adapter port 구현

```typescript
// executeItem 호출 결과 (항상)
{
  itemId: command.itemId,
  status: 'SKIPPED',
  errorCode: 'LIVE_ADAPTER_SKELETON_DISABLED',
  errorMessage: 'Live Adapter skeleton is registered but not executable ...',
  naverApiCalled: false,
}
```

- fetch / axios / HTTP client 없음
- Naver API endpoint URL 없음
- access token 발급 없음
- 인증정보 사용 없음

### `buildLiveAdapterSkeletonDisabledResult()` — standalone 결과

```json
{
  "ok": false,
  "success": false,
  "exists": true,
  "status": "DISABLED",
  "resultCode": "LIVE_ADAPTER_SKELETON_DISABLED",
  "resultMessage": "이 단계는 Live Adapter 구조만 준비된 상태입니다...",
  "naverApiCalled": false,
  "naverApiCallAllowed": false,
  "liveExecutionEnabled": false,
  "httpRequestCreated": false,
  "endpointCalled": false,
  "accessTokenRequested": false,
  "credentialsUsed": false,
  "operatingDbWriteAllowed": false,
  "queueAllowed": false,
  "workerAllowed": false,
  "maxAllowedState": "LIVE_ADAPTER_SKELETON_REGISTERED_BUT_DISABLED",
  "sanitized": true
}
```

## Factory 보강 내용

| adapterMode | 결과 |
|-------------|------|
| `undefined` / `''` / `'disabled'` / 미인식값 | disabled adapter (기존 유지) |
| `'mock'` | mock adapter (기존 유지) |
| `'live'` / `'prod'` / `'production'` / `'operating'` | throw — 차단 (기존 유지) |
| `'bulk'` / `'mass'` | throw — 차단 (기존 유지) |
| `'live-skeleton'` / `'disabled-live-skeleton'` | skeleton adapter 반환 (신규) |

- `live-skeleton`은 `live` 차단의 우회경로가 아님 — 별도 명시 모드
- skeleton adapter는 항상 `SKIPPED` + `LIVE_ADAPTER_SKELETON_DISABLED` 반환
- 대소문자 비교는 `.toLowerCase()` 기준 (기존 BLOCKED_MODES 동일)

## UI/API에서 표시되는 내용

### API 응답 (`GET /api/sku-matching/draft-batch/[jobId]`)

`responseJob.liveAdapterSkeletonStatus` 필드 추가:
```json
{
  "ok": false,
  "success": false,
  "exists": true,
  "status": "DISABLED",
  "resultCode": "LIVE_ADAPTER_SKELETON_DISABLED",
  "resultMessage": "...",
  "naverApiCallAllowed": false,
  "liveExecutionEnabled": false,
  "httpRequestCreated": false,
  "endpointCalled": false,
  "accessTokenRequested": false,
  "credentialsUsed": false,
  "maxAllowedState": "LIVE_ADAPTER_SKELETON_REGISTERED_BUT_DISABLED"
}
```

### 대시보드 UI (`/dashboard/sku-keyword-draft-batches/[jobId]`)

"Live Adapter 준비 상태 — 실제 호출 비활성화" 섹션 (환경 안전 확인 바로 다음):

1. **섹션 제목**: `resultCode` 배지 포함
2. **안내 메시지**: skeleton 상태 안내 + 실제 호출 금지 안내
3. **6개 배지**: Live Adapter skeleton만 존재 / 실제 호출 비활성화 / HTTP 요청 없음 / Token 요청 없음 / Endpoint 호출 없음 / Live 실행 불가
4. **8개 상태 체크 카드**: `naverApiCalled`, `naverApiCallAllowed`, `liveExecutionEnabled`, `httpRequestCreated`, `endpointCalled`, `accessTokenRequested`, `credentialsUsed`, `operatingDbWriteAllowed` — 모두 false 표시
5. **maxAllowedState**: `LIVE_ADAPTER_SKELETON_REGISTERED_BUT_DISABLED`

"Live 실행" 버튼 없음. "실제 호출 테스트" 버튼 없음. "승인 후 실행" 버튼 없음.

## disabled/not implemented 결과 기준

`resultCode` 값:
- `LIVE_ADAPTER_SKELETON_DISABLED`: skeleton이 등록되었으나 비활성화 (기본값)
- `LIVE_ADAPTER_NOT_IMPLEMENTED`: 구현이 없는 상태 (향후 확장용)

`maxAllowedState` 값:
- `LIVE_ADAPTER_SKELETON_REGISTERED_BUT_DISABLED`: 최대 허용 상태 (항상 이 값)

## 안전 플래그 유지 여부

| 플래그 | 값 | 범위 |
|--------|-----|------|
| `naverApiCallAllowed` | 항상 `false` | 서비스, API, UI |
| `liveExecutionEnabled` | 항상 `false` | 서비스, API, UI |
| `httpRequestCreated` | 항상 `false` | 서비스, API |
| `endpointCalled` | 항상 `false` | 서비스, API |
| `accessTokenRequested` | 항상 `false` | 서비스, API |
| `credentialsUsed` | 항상 `false` | 서비스, API |
| `operatingDbWriteAllowed` | 항상 `false` | 서비스, API |
| `queueAllowed` | 항상 `false` | 서비스 |
| `workerAllowed` | 항상 `false` | 서비스 |
| `sanitized` | 항상 `true` | 서비스 |

## 실제 Naver API 호출 여부

**없음.** HTTP 클라이언트, Naver API endpoint URL, access token, authorization header 없음.

## 운영 DB 접근/write 여부

**없음.** 서비스 함수는 순수 함수. API route는 기존 read(SELECT)만 유지.

## schema/migration 변경 여부

**없음.** 타입 파일 변경 없음. Prisma schema 변경 없음.

## Queue / Worker 호출 여부

**없음.** BullMQ, Worker, enqueue 없음.

## 검증 결과

```
skeleton adapter tests:              32/32 pass
adapter factory tests:               20/20 pass (기존 유지)
dashboard service tests:             23/23 pass (기존 유지)
audit history tests:                 32/32 pass (기존 유지)
environment safety guard tests:      39/39 pass (기존 유지)
live safety gate tests:              28/28 pass (기존 유지)
mock adapter tests:                  15/15 pass (기존 유지)
...(기타 기존 테스트 포함)
총:                                 772/772 pass

npx.cmd tsc --noEmit  → clean
npx.cmd prisma validate → valid
git diff --check        → clean
```

## 다음 작업 제안

- 실제 Live Adapter 구현 준비: Naver API endpoint / auth 흐름 설계 (별도 Safety Gate 강화 선행)
- 또는: Naver API 인증 흐름 안전 분리 설계 문서 작성
- 현재 단계: Adapter skeleton 등록 완료, Live 호출은 여전히 차단 상태
