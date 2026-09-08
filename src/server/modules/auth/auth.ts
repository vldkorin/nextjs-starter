import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

import { Env } from "@/env.config";
import { db } from "@/src/server/db/client";
import { schema } from "@/src/server/db/schema";

const auth = betterAuth({
  baseURL: Env.BETTER_AUTH_URL,
  secret: Env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema
  }),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: Env.GOOGLE_CLIENT_ID,
      clientSecret: Env.GOOGLE_CLIENT_SECRET
    }
  },
  plugins: [nextCookies()]
});

export { auth };
