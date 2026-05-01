import { auth } from "./auth";

import { publicProcedure, router } from "@/src/server/trpc/init";
import { registerSchema } from "@/src/shared/modules/auth/schemas/register.schema";

const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      return auth.register(input);
    })
});

export { authRouter };
