import { AuthService } from "./auth.service";

import { usersService } from "@/src/server/modules/users/users";

const auth = new AuthService(usersService);

export { auth };
