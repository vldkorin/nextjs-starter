import { loadEnvConfig } from "@next/env";
import * as z from "zod";

loadEnvConfig(process.cwd());

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().positive(),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  HASH_SALT_ROUNDS: z.coerce.number().int().positive(),
  JWT_ALGORITHM: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRATION_TIME: z.string().min(1)
});

export const Env = schema.parse(process.env);
