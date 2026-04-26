const config = {
  entry: [
    "app/**/*.{ts,tsx}",
    "src/server/modules/auth/auth.ts",
    "src/server/modules/users/users.ts",
    "drizzle.config.ts"
  ],
  project: [
    "app/**/*.{ts,tsx}",
    "src/**/*.{ts,tsx}",
    "*.config.{js,mjs,ts}",
    "project.config.mjs"
  ],
  ignoreDependencies: ["tailwindcss", "@trpc/next", "drizzle-kit"]
};

export default config;
