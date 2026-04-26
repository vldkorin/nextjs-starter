import { BaseToken } from "./base-token";

import { Env } from "@/env.config";

const token = new BaseToken({
  jwtAlgorithm: Env.JWT_ALGORITHM,
  jwtSecret: Env.JWT_SECRET,
  tokenExpirationTime: Env.JWT_EXPIRATION_TIME
});

export { token };
