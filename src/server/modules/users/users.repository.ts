import { desc } from "drizzle-orm";

import { db } from "@/src/server/db/client";
import { user } from "@/src/server/db/tables/auth.table";
import type { UserEntity } from "@/src/shared/modules/users/types/user.type";

class UsersRepository {
  public async findAll(): Promise<UserEntity[]> {
    return db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        createdAt: user.createdAt
      })
      .from(user)
      .orderBy(desc(user.createdAt));
  }
}

export { UsersRepository };
