import type { UsersRepository } from "@/src/server/modules/users/users.repository";
import type { Hash } from "@/src/server/utils/hash/types/types";
import { registerSchema } from "@/src/shared/modules/auth/schemas/register.schema";
import { UserErrorMessageEnum } from "@/src/shared/modules/users/enums/user-error-message.enum";
import type { CreateUserRequest } from "@/src/shared/modules/users/types/user.create-request.type";
import type { UserEntity } from "@/src/shared/modules/users/types/user.type";

class UsersService {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hash: Hash
  ) {}

  public async create(input: CreateUserRequest): Promise<UserEntity> {
    const { email, password } = registerSchema.parse(input);
    const existingUser = await this.usersRepository.findByEmail(email);

    if (existingUser) {
      throw new Error(UserErrorMessageEnum.USER_WITH_EMAIL_ALREADY_EXISTS);
    }

    const { encryptedData } = await this.hash.encrypt(password);

    return this.usersRepository.create({
      email,
      passwordHash: encryptedData
    });
  }
}

export { UsersService };
