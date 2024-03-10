import { NextResponse } from "next/server";
import { db } from "../../../../../db/access";
import { lesson } from "../../../../../db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// /answer/a --> slug=a
export async function DELETE(request: Request,
    { params }: { params: { slug: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        console.log("hello world")

        const { slug } = params;

        console.log(slug);
        debugger;

        console.log("HIERR")
        const deleted = await db.delete(lesson).where(eq(lesson.id, slug)).returning();
        console.log("HIER", deleted);
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}

export async function GET(request: Request,
    { params }: { params: { slug: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const lesson = await db.query.lesson.findFirst({
            where: (lesson, { eq, and }) => and(eq(lesson.organization, session.user.organization), eq(lesson.id, params.slug))
        })

        const courseContent = await db.query.courseContent.findFirst({
            where: (courseContent, { eq, and }) => and(eq(courseContent.lesson, params.slug), eq(courseContent.lesson, params.slug)),
        })



        return NextResponse.json({ success: true, lesson, courseContent }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}