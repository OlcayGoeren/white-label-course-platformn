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
 ALTER TABLE "User" ADD CONSTRAINT "User_organization_Organization_id_fk" FOREIGN KEY ("organization") REFERENCES "Organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
