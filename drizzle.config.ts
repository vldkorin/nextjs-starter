import { defineConfig } from "drizzle-kit";
import { Env } from "./env.config";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: Env.DATABASE_URL
  }
});
