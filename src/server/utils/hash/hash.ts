import { BaseHash } from "./base-hash";

import { Env } from "@/env.config";

const hash = new BaseHash({
  saltRounds: Env.HASH_SALT_ROUNDS
});

export { hash };
