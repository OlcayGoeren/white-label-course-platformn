ALTER TABLE "CourseContent" ALTER COLUMN "lesson" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "role" text DEFAULT 'user';