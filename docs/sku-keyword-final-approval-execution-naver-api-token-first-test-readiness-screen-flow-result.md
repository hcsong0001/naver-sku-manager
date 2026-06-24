# Task 39 - Token First Test Readiness Screen Flow / Read-only Dashboard Integration Result

## 개요
이 문서는 "Task 26~38에서 만든 안전 계층들을 실제 화면에서 한눈에 확인할 수 있도록, SKU Keyword Draft Batch 상세 화면에 Readiness Read-only 패널을 연결"하는 작업의 결과를 기록합니다.
사용자는 이 화면을 통해 현재 Token First Test를 실행하기 위해 필요한 안전 계층들이 각각 어떤 상태인지 투명하게 확인할 수 있습니다.
이 과정에서 실제 API 실행, 토큰 발급, DB 기록은 전혀 발생하지 않는 완벽한 Read-only 구조를 유지합니다.

## 종합 점검 대상
1. **Readiness Screen View Model Service** (신규)
2. **Draft Batch Detail Route (`route.ts`)**
3. **Draft Batch Detail Page (`page.tsx`)**
4. 화면 내 12단계 안전 계층 상태 표시

## 구현 상세

### 1. Readiness Screen View Model 생성 서비스
* `buildNaverApiTokenFirstTestReadinessScreenView` 순수 함수를 작성하여, 이전의 모든 안전 계층(Safety Boundary, Sandbox, Go Ticket, Audit Plan, Persistence Disabled 등)의 결과를 취합합니다.
* 화면에서 손쉽게 그릴 수 있도록 `statusCards`와 `safetySteps` 배열을 제공합니다.
* 여전히 `screenActionEnabled=false`, `dbWriteAllowed=false`, `tokenIssued=false` 등 어떠한 실행 권한도 열어주지 않습니다.

### 2. Route 연동 (`app/api/sku-matching/draft-batch/[jobId]/route.ts`)
* `evaluateNaverApiTokenFirstTestGoTicketPersistenceDisabled`와 앞선 모든 계층의 로직을 안전하게 호출한 뒤 최종적으로 `buildNaverApiTokenFirstTestReadinessScreenView`를 통해 얻은 View Model을 `responseJob.naverAuthTokenFirstTestReadinessScreen`에 매핑합니다.
* Prisma의 `.create()`, `.update()` 등 mutation 코드는 단 한 줄도 추가되지 않았습니다.

### 3. Page 연동 (`app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`)
* 화면 하단에 "Naver Token First Test Readiness" 섹션을 구성하여 View Model을 렌더링합니다.
* 전체 상태와 안전 계층 단계를 카드 형식으로 보여주며, **어떠한 실행 버튼(Token 발급 실행 등)도 포함되지 않았습니다.**
* "현재는 read-only 준비 상태 확인만 가능합니다"라는 명확한 안내문을 노출합니다.

## 검증 내역
* **테스트 케이스 수**: 신규 테스트 33개(테스트 파일 내부), 그 외 기존 테스트 모두 통과.
* **보안 검증**:
  * 소스코드 및 View Model에 Secret, Access Token, Refresh Token 문자열 없음.
  * `fetch`, `axios` 등 외부 네트워크 통신 코드 없음.
  * Prisma mutation 없음.

## 결론
이번 단계를 통해 11중의 보안 계층을 통과해야만 허락되는 Token First Test의 "진행 상황(준비 상태)"을 사용자가 직접 시각적으로 확인할 수 있게 되었습니다. 사용자는 이 대시보드를 통해 다음 단계 진행에 필요한 요건들을 안전하게 리뷰할 수 있습니다.
