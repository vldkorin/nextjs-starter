import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/src/server/modules/auth/auth";

export const { GET, POST } = toNextJsHandler(auth);
