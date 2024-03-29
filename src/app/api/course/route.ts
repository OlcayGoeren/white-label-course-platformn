import { CourseZodSchemaForm } from "@/types/courses";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "../../../../db/access";
import { course, lesson, module as moduleSchema } from "../../../../db/schema";
import { UpdateCourseOrder } from "../../../../hooks/updateCourseOrder";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const courses = await db.query.course.findMany({
            where: (course, { eq, and }) => eq(course.organization, session.user.organization)
        });

        const modules = await db.query.module.findMany({
            where: (module, { eq, and, inArray }) => inArray(module.course, courses.map(ele => ele.id))
        });



        const coursesWithModules = courses.filter((course) => {
            return modules.some((module) => module.course === course.id)
        })



        return NextResponse.json({ courses: coursesWithModules }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}

export async function POST(request: NextRequest) {
    try {

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const body = await request.json();
        const validBody = CourseZodSchemaForm.parse(body);

        const createdCourse = await db.insert(course).values({
            title: validBody.title,
            description: validBody.description,
            status: validBody.status,
            price: validBody.price,
            instructor: session.user.id,
            organization: session.user.organization,
        }).returning();

        return NextResponse.json({ success: true, course: createdCourse[0].id }, { status: 200 })
    } catch (error) {

        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const body = await request.json() as UpdateCourseOrder;

        body.modules.forEach(async (moduleEle) => {
            const result = await db.update(moduleSchema)
                .set({ order: moduleEle.order })
                .where(eq(moduleSchema.id, moduleEle.id)).returning(({ updatedId: moduleSchema.id }));
        });
        body.lessons.forEach(async (lessonsEle) => {
            const result = await db.update(lesson)
                .set({ order: lessonsEle.order, module: lessonsEle.module })
                .where(eq(lesson.id, lessonsEle.id));
        });
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}