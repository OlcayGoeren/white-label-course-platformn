import { NextResponse } from "next/server";
import { db } from "../../../../../db/access";
import { and } from "drizzle-orm";
import { ModuleWithAllRelations } from "@/types/modules";
import { LessonWithAllRelations } from "@/types/lessons";
import { CourseContentchema } from "@/types/courseContent";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// /answer/a --> slug=a
export async function GET(request: Request,
    { params }: { params: { slug: string } }) {
    try {

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const course = await db.query.course.findFirst({
            where: (course, { eq }) => and(eq(course.id, params.slug), eq(course.organization, session.user.organization)),
        })

        const modules = await db.query.module.findMany({
            where: (module, { eq }) => and(eq(module.course, course?.id ?? ""), eq(module.organization, session.user.organization)),
            orderBy: (module, { asc }) => [asc(module.order)],
        })

        if (modules.length === 0) return NextResponse.json({ success: false, message: "No modules found" }, { status: 404 });


        const lessons = await db.query.lesson.findMany({
            where: (lesson, { eq, inArray }) => and(
                modules.length > 0 ? inArray(lesson.module, modules.map((module) => module.id)) : undefined
                , eq(lesson.organization, session.user.organization)),
            orderBy: (lesson, { asc }) => [asc(lesson.order)],
        })


        const courseContents = await db.query.courseContent.findMany({
            where: (courseContent, { eq, inArray }) => and(
                lessons.length > 0 ? inArray(courseContent.lesson, lessons.map((lesson) => lesson.id)) : undefined, eq(courseContent.organization, session.user.organization)),
            orderBy: (courseContent, { asc }) => [asc(courseContent.order)],
        })

        const modulesWithRelations: ModuleWithAllRelations[] = modules.map((module) => {
            const newModule = module as unknown as ModuleWithAllRelations;
            const newLessons = lessons as unknown as LessonWithAllRelations[];
            newModule.lessons = newLessons.filter((lesson) => lesson.module === module.id);
            newModule.lessons = newModule.lessons.map((lesson) => {
                const newCourseContents = courseContents as unknown as CourseContentchema[];
                lesson.courseContents = newCourseContents.filter((courseContent) => courseContent.lesson === lesson.id);
                return lesson;
            });
            return newModule;
        });

        return NextResponse.json({ modulesWithRelations }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}