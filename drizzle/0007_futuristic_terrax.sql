ALTER TABLE "Lesson" ALTER COLUMN "status" SET DEFAULT 'inactive';--> statement-breakpoint
ALTER TABLE "CourseContent" DROP COLUMN IF EXISTS "order";