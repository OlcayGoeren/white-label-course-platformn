CREATE TABLE IF NOT EXISTS "Course" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" text NOT NULL,
	"instructor" integer NOT NULL,
	"questions" json,
	"price" integer NOT NULL,
	"organization" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Lesson" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"module" integer,
	"order" integer,
	"status" varchar,
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
CREATE TABLE IF NOT EXISTS "Organization" (
	"id" serial PRIMARY KEY NOT NULL,
	"telephone" text NOT NULL,
	"domain" text NOT NULL,
	"linkedin" text,
	"instagram" text,
	"iban" text NOT NULL,
	"accountOwner" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"forname" text NOT NULL,
	"surname" text NOT NULL,
	"birthdate" date NOT NULL,
	"email" text NOT NULL,
	"role" text NOT NULL,
	"organization" integer NOT NULL,
	"gender" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"country" text NOT NULL,
	"postalCode" integer NOT NULL,
	CONSTRAINT "User_email_organization_unique" UNIQUE("email","organization")
);
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
 ALTER TABLE "User" ADD CONSTRAINT "User_organization_Organization_id_fk" FOREIGN KEY ("organization") REFERENCES "Organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
