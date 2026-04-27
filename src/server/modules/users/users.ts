import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

import { hash } from "@/src/server/utils/hash/hash";

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository, hash);

export { usersRepository, usersService };
