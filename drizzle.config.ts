import { defineConfig } from "drizzle-kit";
import { Env } from "./env.config";

export default defineConfig({
  schema: "./src/server/db/tables/*.table.ts",
  out: "./src/server/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    user: Env.DB_USER,
    password: Env.DB_PASSWORD,
    database: Env.DB_NAME
  }
});
