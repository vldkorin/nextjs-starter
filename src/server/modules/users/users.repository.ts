import { eq } from "drizzle-orm";

import type { CreateUserInput } from "./types/create-user-input.type";
import type { User } from "./types/user.type";

import { db } from "@/src/server/db/client";
import { users } from "@/src/server/db/schema";

class UsersRepository {
  public async findByEmail(email: string): Promise<User | null> {
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

  public async create(input: CreateUserInput): Promise<User> {
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
