# FinalApproval Execution Transition Apply PrismaPg ConnectionString Minimal Fix Result

## 1. 작업명
FinalApproval Execution Transition Apply PrismaPg ConnectionString Minimal Fix Result Doc and Commit

## 2. 작업 목적
Prisma v7 환경에서 테스트용 PostgreSQL 데이터베이스 접속 시 발생하는 SCRAM 인증 에러(`SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string`)를 해결하기 위해 어댑터 생성 방식을 교정하고, 스크립트 실행 실패가 발생하더라도 후속 작업이 전파되지 않도록 종료 코드(`process.exitCode = 1`)를 보완한 결과를 문서화하고 저장하기 위함입니다.

## 3. 수정 파일 목록
- `scripts/lib/create-safe-prisma-client-for-test-db.ts`
- `scripts/restore-final-approval-transition-apply-test-db-fixture.ts`
- `scripts/verify-final-approval-transition-apply-real-prisma-adapter-test-db-write.ts`

## 4. 새 파일 추가 여부
추가 파일 없음. (결과 보고용 현재 문서 1건만 신규 생성)

## 5. package.json / package-lock.json 수정 여부
수정 없음.

## 6. npm install 실행 여부
실행 없음.

## 7. PrismaPg 생성 방식 변경 내용
`PrismaPg` adapter 생성 시 기존처럼 `pg.Pool` 인스턴스를 선행 생성하여 넘기지 않고, 원본 `DATABASE_URL` 문자열을 `connectionString` 속성으로 직접 전달하도록 최소 수정했습니다. `pg.Pool`의 내부 파싱 오류 가능성을 차단하고 Prisma v7 공식 문서 가이드에 호환되도록 구성했습니다.

## 8. connectionString 사용 여부
사용함. `const adapter = new PrismaPg({ connectionString: dbUrl });` 형태로 적용 완료했습니다.

## 9. DATABASE_URL 원문 출력 여부
출력 없음.

## 10. restore script 실패 시 non-zero exit 처리 여부
반영됨. `catch` 블록에서 `process.exitCode = 1`을 설정하여 `finally`의 Prisma disconnect를 보장하면서도 에러 코드를 유지하게끔 수정했습니다.

## 11. verify script 실패 시 non-zero exit 처리 여부
반영됨.

## 12. restore script 실행 여부
실행 없음.

## 13. verify script 실행 여부
실행 없음.

## 14. DB 접속 여부
접속 없음.

## 15. DB 조회 여부
조회 쿼리 수행 없음.

## 16. DB write 여부
쓰기 작업 없음.

## 17. Worker 실행 여부
실행 없음.

## 18. Queue Job enqueue 여부
추가 없음.

## 19. Redis 사용 여부
사용 없음.

## 20. Naver API 호출 여부
호출 없음.

## 21. 테스트/검증 명령 결과
80개의 단위 및 통합 로직 테스트가 모두 에러 없이 통과되었으며(`pass 80`), TypeScript 컴파일 및 정적 검증(`prisma validate`, `git diff --check` 등)을 완벽히 통과했습니다.

## 22. git status --short 결과
수정된 파일 및 현재 추가된 문서가 추적 대상에 포함되었습니다.

## 23. 커밋/푸시 여부
수정된 3개 스크립트 파일과 본 결과 문서만 선별하여 `git add` 후 `fix: use connection string for test db prisma pg adapter` 메시지로 안전하게 커밋하고 리모트에 푸시를 완료했습니다.

## 핵심 결론
PrismaPg adapter 생성 시 URL 객체나 pg.Pool 인스턴스를 넘기지 않고, 원본 DATABASE_URL 문자열을 connectionString 속성으로 전달하도록 최소 수정했다.

목표 형태:
```typescript
const adapter = new PrismaPg({ connectionString: dbUrl });
const prisma = new PrismaClient({ adapter });
```

이번 단계에서는 DB script를 실행하지 않았으며, DB 접속/조회/write도 수행하지 않았다.
