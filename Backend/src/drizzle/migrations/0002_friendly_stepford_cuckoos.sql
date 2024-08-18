DO $$ BEGIN
 CREATE TYPE "public"."message_status" AS ENUM('Read', 'Unread', 'Delivered');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "chat" ADD COLUMN "messageStatus" "message_status" DEFAULT 'Delivered';