import type { UsersRepository } from "@/src/server/modules/users/users.repository";
import type { UserEntity } from "@/src/shared/modules/users/types/user.type";

class UsersService {
  public constructor(private readonly usersRepository: UsersRepository) {}

  public async list(): Promise<UserEntity[]> {
    return this.usersRepository.findAll();
  }
}

export { UsersService };
