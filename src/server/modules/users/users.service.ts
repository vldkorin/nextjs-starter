import type { UsersRepository } from "@/src/server/modules/users/users.repository";
import { hash } from "@/src/server/utils/hash/hash";
import {
  AuthValidationEnum,
  type CreateUserRequest,
  type UserEntity
} from "@/src/shared";

class UsersService {
  public constructor(private readonly usersRepository: UsersRepository) {}

  public async create(input: CreateUserRequest): Promise<UserEntity> {
    if (input.password.length < AuthValidationEnum.PASSWORD_MIN_LENGTH) {
      throw new Error(
        `Password must be at least ${AuthValidationEnum.PASSWORD_MIN_LENGTH} characters long`
      );
    }

    if (input.password !== input.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const email = input.email.trim().toLowerCase();
    const existingUser = await this.usersRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const { encryptedData } = await hash.encrypt(input.password);

    return this.usersRepository.create({
      email,
      passwordHash: encryptedData
    });
  }
}

export { UsersService };
