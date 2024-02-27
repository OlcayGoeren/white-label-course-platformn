CREATE TABLE IF NOT EXISTS "Answer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" text,
	"question" uuid,
	"user" uuid,
	"createdAt" timestamp DEFAULT now(),
	"organization" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Course" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" text NOT NULL,
	"instructor" uuid NOT NULL,
	"questions" json,
	"price" integer NOT NULL,
	"organization" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CourseContent" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson" uuid,
	"order" integer,
	"lectureType" text,
	"lectureConfig" json,
	"organization" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Invoice" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" integer,
	"date" timestamp DEFAULT now(),
	"user" uuid,
	"course" uuid,
	"organization" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Lesson" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"module" uuid,
	"order" integer,
	"status" text,
	"allowPreview" boolean DEFAULT false,
	"organization" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Module" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"course" uuid NOT NULL,
	"order" integer NOT NULL,
	"status" varchar NOT NULL,
	"allowPreview" boolean DEFAULT false NOT NULL,
	"organization" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Organization" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"telephone" text NOT NULL,
	"domain" text NOT NULL,
	"iban" text NOT NULL,
	"accountOwner" text NOT NULL,
	CONSTRAINT "Organization_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" text,
	"lesson" uuid,
	"user" uuid,
	"createdAt" timestamp DEFAULT now(),
	"organization" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" uuid PRIMARY KEY NOT NULL,
	"forname" text NOT NULL,
	"surname" text NOT NULL,
	"birthdate" date NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text NOT NULL,
	"organization" uuid NOT NULL,
	CONSTRAINT "User_email_organization_unique" UNIQUE("email","organization")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Answer" ADD CONSTRAINT "Answer_question_Question_id_fk" FOREIGN KEY ("question") REFERENCES "Question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Answer" ADD CONSTRAINT "Answer_user_User_id_fk" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Answer" ADD CONSTRAINT "Answer_organization_Organization_id_fk" FOREIGN KEY ("organization") REFERENCES "Organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Course" ADD CONSTRAINT "Course_instructor_User_id_fk" FOREIGN KEY ("instructor") REFERENCES "User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Course" ADD CONSTRAINT "Course_organization_Organization_id_fk" FOREIGN KEY ("organization") REFERENCES "Organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_user_User_id_fk" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_course_Course_id_fk" FOREIGN KEY ("course") REFERENCES "Course"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_organization_Organization_id_fk" FOREIGN KEY ("organization") REFERENCES "Organization"("id") ON DELETE no action ON UPDATE no action;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Question" ADD CONSTRAINT "Question_lesson_Lesson_id_fk" FOREIGN KEY ("lesson") REFERENCES "Lesson"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Question" ADD CONSTRAINT "Question_user_User_id_fk" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Question" ADD CONSTRAINT "Question_organization_Organization_id_fk" FOREIGN KEY ("organization") REFERENCES "Organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "User" ADD CONSTRAINT "User_organization_Organization_id_fk" FOREIGN KEY ("organization") REFERENCES "Organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
