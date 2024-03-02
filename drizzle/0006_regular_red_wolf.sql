ALTER TABLE "Answer" DROP CONSTRAINT "Answer_question_Question_id_fk";
--> statement-breakpoint
ALTER TABLE "CourseContent" DROP CONSTRAINT "CourseContent_lesson_Lesson_id_fk";
--> statement-breakpoint
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_user_User_id_fk";
--> statement-breakpoint
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_module_Module_id_fk";
--> statement-breakpoint
ALTER TABLE "Question" DROP CONSTRAINT "Question_lesson_Lesson_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Answer" ADD CONSTRAINT "Answer_question_Question_id_fk" FOREIGN KEY ("question") REFERENCES "Question"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CourseContent" ADD CONSTRAINT "CourseContent_lesson_Lesson_id_fk" FOREIGN KEY ("lesson") REFERENCES "Lesson"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_user_User_id_fk" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_module_Module_id_fk" FOREIGN KEY ("module") REFERENCES "Module"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Question" ADD CONSTRAINT "Question_lesson_Lesson_id_fk" FOREIGN KEY ("lesson") REFERENCES "Lesson"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
