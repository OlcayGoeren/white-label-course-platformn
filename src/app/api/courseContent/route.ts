import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { CourseContentZodSchema, CourseContentZodSchemaForm, CourseContentZodSchemaUpdate, VideoConfigSchema, videoConfigSchema } from "@/types/courseContent";
import { db } from "../../../../db/access";
import { courseContent } from "../../../../db/schema";
import { and, eq } from "drizzle-orm";
import axios from "axios";
import { CreateVideoRequest } from "../../../../hooks/createVideo";

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
        const parsedBody = CourseContentZodSchemaUpdate.parse(body);
        // hier weiter

        const updatetRow = await db.update(courseContent)
            .set({
                lectureType: parsedBody.lectureType,
                lectureConfig: parsedBody.lectureConfig
            })
            .where(and(eq(courseContent.id, parsedBody.id), eq(courseContent.organization, session.user.organization)))
            .returning();

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