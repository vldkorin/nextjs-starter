import { loadEnvConfig } from "@next/env";
import * as z from "zod";

loadEnvConfig(process.cwd());

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string().min(1)
});

export const Env = schema.parse(process.env);
