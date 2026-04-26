import { authRouter } from "@/src/server/modules/auth/auth.router";
import { router } from "@/src/server/trpc/init";

export const appRouter = router({
  auth: authRouter
});
