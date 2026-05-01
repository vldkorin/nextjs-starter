import {
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull()
  },
  (usersTable) => {
    return [uniqueIndex("users_email_unique").on(usersTable.email)];
  }
);
