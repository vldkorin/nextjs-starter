import { usersRouter } from "@/src/server/modules/users/users.router";
import { router } from "@/src/server/trpc/init";

export const appRouter = router({
  users: usersRouter
});

export type AppRouter = typeof appRouter;
