import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { CourseContentZodSchemaForm, CourseContentZodSchemaFormWithId, VideoConfigSchema, quizConfigSchema, videoConfigSchema } from "@/types/courseContent";
import { db } from "../../../../db/access";
import { courseContent } from "../../../../db/schema";
import { and, eq } from "drizzle-orm";

export async function GET(request: Request) {
    try {
        return NextResponse.json({ success: true }, { status: 200 })
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
        const parsedBody = CourseContentZodSchemaForm.parse(body);
        switch (parsedBody.lectureType) {
            case "video":
                const videoConfig = videoConfigSchema.parse(parsedBody.lectureConfig);
                const result = await db.insert(courseContent).values({
                    organization: session.user.organization,
                    lesson: parsedBody.lesson,
                    lectureType: parsedBody.lectureType,
                    lectureConfig: videoConfig
                }).returning();
                break;
            case "quiz":
                const quizData = quizConfigSchema.parse(parsedBody.lectureConfig);
                console.log("hier")
                console.log(quizData)
                const result2 = await db.insert(courseContent).values({
                    organization: session.user.organization,
                    lesson: parsedBody.lesson,
                    lectureType: parsedBody.lectureType,
                    lectureConfig: quizData
                }).returning();
                break;
            default:
                return NextResponse.json({}, { status: 400 })
        }
        return NextResponse.json({ success: true }, { status: 200 })
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

        const body = await request.json();
        const parsedBody = CourseContentZodSchemaFormWithId.parse(body);

        switch (parsedBody.lectureType) {
            case "video": {
                const videoConfig = videoConfigSchema.parse(parsedBody.lectureConfig);
                const updatetRow = await db.update(courseContent)
                    .set({
                        lectureType: parsedBody.lectureType,
                        lectureConfig: videoConfig
                    })
                    .where(and(eq(courseContent.id, parsedBody.id), eq(courseContent.organization, session.user.organization)))
                    .returning();
                break;
            }
            case "quiz": {
                const quizData = quizConfigSchema.parse(parsedBody.lectureConfig);
                const updatetRow = await db.update(courseContent)
                    .set({
                        lectureType: parsedBody.lectureType,
                        lectureConfig: quizData
                    })
                    .where(and(eq(courseContent.id, parsedBody.id), eq(courseContent.organization, session.user.organization)))
                    .returning();
                break;
            }
        }

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