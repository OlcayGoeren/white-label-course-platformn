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
            where: (course, { eq }) => and(eq(course.id, params.slug)),
        })

        const modules = await db.query.modulee.findMany({
            where: (modulee, { eq }) => and(eq(modulee.course, course?.id ?? "")),
            orderBy: (modulee, { asc }) => [asc(modulee.order)],
        })

        if (modules.length === 0) return NextResponse.json({ success: false, message: "No modules found" }, { status: 404 });


        const lessons = await db.query.lesson.findMany({
            where: (lesson, { eq, inArray }) => and(
                inArray(lesson.module, modules.map((modulee) => modulee.id))),
            orderBy: (lesson, { asc }) => [asc(lesson.order)],
        })

        const modulesWithRelations: ModuleWithAllRelations[] = modules.map((modulee) => {
            const newModule = modulee as unknown as ModuleWithAllRelations;
            const newLessons = lessons as unknown as LessonWithAllRelations[];
            newModule.lessons = newLessons.filter((lesson) => lesson.module === modulee.id);
            return newModule;
        });

        return NextResponse.json({ course, modules: modulesWithRelations }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}