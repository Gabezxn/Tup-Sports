import { Pool } from "pg";

let pool;

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool() {
  if (!hasDatabaseUrl()) {
    throw new Error("DATABASE_URL nao foi configurada.");
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }

  return pool;
}
