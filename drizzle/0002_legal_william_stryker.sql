CREATE TABLE IF NOT EXISTS "Answer" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text,
	"question" integer,
	"user" integer,
	"createdAt" timestamp DEFAULT now(),
	"organization" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Invoice" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" integer,
	"date" timestamp DEFAULT now(),
	"user" integer,
	"course" integer,
	"organization" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Question" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text,
	"lesson" integer,
	"user" integer,
	"createdAt" timestamp DEFAULT now(),
	"organization" integer NOT NULL
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
