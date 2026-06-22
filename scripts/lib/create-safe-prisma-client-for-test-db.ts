import { PrismaClient } from '../../app/generated/prisma';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * 테스트 DB 환경 전용 안전한 PrismaClient 생성기
 *
 * 1. process.env.DATABASE_URL을 읽습니다. (출력 금지)
 * 2. URL을 파싱하여 localhost (또는 127.0.0.1), 포트 55432, dbname 'test' 포함 여부를 검증합니다.
 * 3. 운영 DB 의심 문자열이 있으면 에러를 던집니다.
 * 4. pg 모듈의 Pool과 @prisma/adapter-pg를 사용하여 PrismaClient를 반환합니다.
 */
export function createSafePrismaClientForTestDb(): PrismaClient {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('[Error] process.env.DATABASE_URL is not set. Aborting.');
  }

  try {
    const parsedUrl = new URL(dbUrl);
    const host = parsedUrl.hostname;
    const port = parsedUrl.port;
    const dbName = parsedUrl.pathname;

    if (host !== 'localhost' && host !== '127.0.0.1') {
      throw new Error('[Error] DATABASE_URL host is not localhost or 127.0.0.1. Aborting to protect non-local DB.');
    }
    if (port !== '55432') {
      throw new Error('[Error] DATABASE_URL port is not 55432. Aborting to protect unknown DB.');
    }
    if (!dbName.includes('test')) {
      throw new Error('[Error] DATABASE_URL database name does not contain "test". Aborting.');
    }
  } catch (e) {
    throw new Error('[Error] Failed to parse DATABASE_URL. Aborting.');
  }

  // 안전 검증 통과 후 Pool 및 Adapter 초기화
  const pool = new Pool({ connectionString: dbUrl });
  const adapter = new PrismaPg(pool);

  // Prisma v7 환경에서는 생성 시 adapter를 명시적으로 주입
  return new PrismaClient({ adapter });
}
