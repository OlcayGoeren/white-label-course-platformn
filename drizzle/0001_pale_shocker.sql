ALTER TABLE "Course" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();