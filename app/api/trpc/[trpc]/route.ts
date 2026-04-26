import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { createTRPCContext } from "@/src/server/trpc/context";
import { appRouter } from "@/src/server/trpc/router";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: createTRPCContext
  });
};

export { handler as GET, handler as POST };
