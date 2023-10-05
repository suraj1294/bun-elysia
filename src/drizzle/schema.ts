import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    password: varchar("password").notNull(),
    fullName: text("full_name").notNull(),
    email: varchar("email").unique().notNull(),
    phone: varchar("phone").notNull(),
    role: text("role", { enum: ["user", "admin"] })
      .default("user")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (users) => ({
    iemailIdx: uniqueIndex("email_idx").on(users.email),
  })
);

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type
