import { usersService } from "./users";

import { publicProcedure, router } from "@/src/server/trpc/init";

const usersRouter = router({
  list: publicProcedure.query(() => {
    return usersService.list();
  })
});

export { usersRouter };
