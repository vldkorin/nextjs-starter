import type { UsersService } from "@/src/server/modules/users/users.service";
import type { Token } from "@/src/server/utils/token/types/types";
import type { RegisterInput } from "@/src/shared/modules/auth/types/register.input.type";
import type { RegisterResult } from "@/src/shared/modules/auth/types/register.result.type";

class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly token: Token
  ) {}

  public async register(input: RegisterInput): Promise<RegisterResult> {
    const user = await this.usersService.create(input);
    const accessToken = await this.token.create({ userId: user.id });

    return {
      token: accessToken,
      user
    };
  }
}

export { AuthService };
