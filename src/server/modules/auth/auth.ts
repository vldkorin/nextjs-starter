import { AuthService } from "./auth.service";

import { usersService } from "@/src/server/modules/users/users";
import { token } from "@/src/server/utils/token/token";

const auth = new AuthService(usersService, token);

export { auth };
