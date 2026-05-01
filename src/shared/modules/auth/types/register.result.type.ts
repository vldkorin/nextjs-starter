import type { UserEntity } from "../../users/types/user.type";

export interface RegisterResult {
  token: string;
  user: UserEntity;
}
