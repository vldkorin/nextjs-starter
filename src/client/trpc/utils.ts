import { createTRPCContext } from "@trpc/tanstack-react-query";

import type { AppRouter } from "@/src/server/trpc/router";

const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

export { TRPCProvider, useTRPC };
