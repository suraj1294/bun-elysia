import { pgTable, uniqueIndex, serial, text, varchar, timestamp } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"


export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	fullName: text("full_name").notNull(),
	phone: varchar("phone").notNull(),
	role: text("role").default('user').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	password: varchar("password").notNull(),
	email: varchar("email").notNull(),
},
(table) => {
	return {
		emailIdx: uniqueIndex("email_idx").on(table.email),
	}
});