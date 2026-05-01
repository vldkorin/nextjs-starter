import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import type { Context } from "./context";

const trpc = initTRPC.context<Context>().create({
  transformer: superjson
});

const { router, procedure } = trpc;

const publicProcedure = procedure;

export { publicProcedure, router };
