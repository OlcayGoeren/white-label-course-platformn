import { NextResponse } from "next/server";
import { db } from "../../../../../db/access";
import { and } from "drizzle-orm";
import { ModuleWithAllRelations } from "@/types/modules";
import { LessonWithAllRelations } from "@/types/lessons";
import { CourseContentchema } from "@/types/courseContent";


// /answer/a --> slug=a
export async function GET(request: Request,
    { params }: { params: { slug: string } }) {
    try {

        const course = await db.query.course.findFirst({
            where: (course, { eq }) => and(eq(course.id, params.slug), eq(course.status, "active")),
        })

        const modules = await db.query.module.findMany({
            where: (module, { eq }) => and(eq(module.course, course?.id ?? "")),
            orderBy: (module, { asc }) => [asc(module.order)],
        })

        if (modules.length === 0) return NextResponse.json({ success: false, message: "No modules found" }, { status: 404 });


        const lessons = await db.query.lesson.findMany({
            where: (lesson, { eq, inArray }) => and(
                modules.length > 0 ? inArray(lesson.module, modules.map((module) => module.id)) : undefined
                , eq(lesson.status, "active")),
            orderBy: (lesson, { asc }) => [asc(lesson.order)],
        })

        const modulesWithRelations: ModuleWithAllRelations[] = modules.map((module) => {
            const newModule = module as unknown as ModuleWithAllRelations;
            const newLessons = lessons as unknown as LessonWithAllRelations[];
            newModule.lessons = newLessons.filter((lesson) => lesson.module === module.id);
            return newModule;
        });

        return NextResponse.json({ course, modules: modulesWithRelations }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}