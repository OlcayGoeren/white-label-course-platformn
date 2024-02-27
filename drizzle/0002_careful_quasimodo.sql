ALTER TABLE "User" DROP CONSTRAINT "User_email_organization_unique";--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN IF EXISTS "role";--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_email_unique" UNIQUE("email");