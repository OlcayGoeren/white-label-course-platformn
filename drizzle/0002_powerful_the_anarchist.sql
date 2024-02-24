CREATE TABLE IF NOT EXISTS "CourseContent" (
	"id" serial PRIMARY KEY NOT NULL,
	"lesson" integer,
	"order" integer,
	"lectureType" text,
	"lectureConfig" json,
	"organization" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Lesson" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"module" integer,
	"order" integer,
	"status" text,
	"allowPreview" boolean DEFAULT false,
	"organization" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Module" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"course" integer NOT NULL,
	"order" integer NOT NULL,
	"status" varchar NOT NULL,
	"allowPreview" boolean DEFAULT false NOT NULL,
	"organization" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Organization" DROP COLUMN IF EXISTS "linkedin";--> statement-breakpoint
ALTER TABLE "Organization" DROP COLUMN IF EXISTS "instagram";--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN IF EXISTS "gender";--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN IF EXISTS "address";--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN IF EXISTS "city";--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN IF EXISTS "country";--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN IF EXISTS "postalCode";--> statement-breakpoint
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_module_Module_id_fk" FOREIGN KEY ("module") REFERENCES "Module"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_organization_Organization_id_fk" FOREIGN KEY ("organization") REFERENCES "Organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Module" ADD CONSTRAINT "Module_course_Course_id_fk" FOREIGN KEY ("course") REFERENCES "Course"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Module" ADD CONSTRAINT "Module_organization_Organization_id_fk" FOREIGN KEY ("organization") REFERENCES "Organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
