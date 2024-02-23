CREATE TABLE IF NOT EXISTS "CourseContent" (
	"id" serial PRIMARY KEY NOT NULL,
	"lesson" integer,
	"order" integer,
	"lectureType" text,
	"lectureConfig" json,
	"organization" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CourseContent" ADD CONSTRAINT "CourseContent_lesson_Lesson_id_fk" FOREIGN KEY ("lesson") REFERENCES "Lesson"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CourseContent" ADD CONSTRAINT "CourseContent_organization_Organization_id_fk" FOREIGN KEY ("organization") REFERENCES "Organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
