import type { UsersService } from "@/src/server/modules/users/users.service";
import { token } from "@/src/server/utils/token/token";
import type { RegisterInput, RegisterResult } from "@/src/shared";

class AuthService {
  public constructor(private readonly usersService: UsersService) {}

  public async register(input: RegisterInput): Promise<RegisterResult> {
    const user = await this.usersService.create(input);
    const accessToken = await token.create({ userId: user.id });

    return {
      token: accessToken,
      user
    };
  }
}

export { AuthService };
