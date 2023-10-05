CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"password" varchar NOT NULL,
	"full_name" text NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");


INSERT INTO "users" VALUES 
(2001, '$2a$10$T9UEmKBxR1JJ9g1LYJrwgeKZrHmg9cpxpI0TCUN/OAfGIcveEP23K', 'suraj patil', 'suraj@test.com', '999-99-999', 'admin'),
(2002, '$2a$10$T9UEmKBxR1JJ9g1LYJrwgeKZrHmg9cpxpI0TCUN/OAfGIcveEP23K', 'kishor patil', 'kishor@test.com', '999-99-999', 'user'),
(2003, '$2a$10$T9UEmKBxR1JJ9g1LYJrwgeKZrHmg9cpxpI0TCUN/OAfGIcveEP23K', 'Sagar Mahajan', 'sagar@test.com', '999-99-999', 'user'),
(2004, '$2a$10$T9UEmKBxR1JJ9g1LYJrwgeKZrHmg9cpxpI0TCUN/OAfGIcveEP23K', 'Rohan Jagdale', 'rohan@test.com', '999-99-999', 'user')