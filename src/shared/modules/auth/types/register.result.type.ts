import type { UserEntity } from "../../users/users";

export interface RegisterResult {
  token: string;
  user: UserEntity;
}
