import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { Env } from "@/env.config";
import { schema } from "@/src/server/db/schema";

const client = postgres({
  host: Env.DB_HOST,
  port: Env.DB_PORT,
  user: Env.DB_USER,
  password: Env.DB_PASSWORD,
  database: Env.DB_NAME
});

export const db = drizzle(client, { schema });
