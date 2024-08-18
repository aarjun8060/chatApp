DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('User', 'Admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"profile_picture" varchar(255) DEFAULT '',
	"about" varchar(255) DEFAULT '',
	"token" varchar(255) DEFAULT '',
	"role" "user_role" DEFAULT 'User',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailIndex" ON "user" USING btree ("email");