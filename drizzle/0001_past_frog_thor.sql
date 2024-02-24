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
