import { eq } from "drizzle-orm";

import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";
import type { CreateUserInput, UserEntity } from "@/src/shared";

class UsersRepository {
  public async findByEmail(email: string): Promise<UserEntity | null> {
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        createdAt: users.createdAt
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user ?? null;
  }

  public async create(input: CreateUserInput): Promise<UserEntity> {
    const [user] = await db
      .insert(users)
      .values({
        email: input.email,
        passwordHash: input.passwordHash
      })
      .returning({
        id: users.id,
        email: users.email,
        createdAt: users.createdAt
      });

    return user;
  }
}

export { UsersRepository };
