import { CourseSchemaForm, CourseZodSchemaForm } from "@/types/courses";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "../../../../db/access";
import { course } from "../../../../db/schema";
import { z } from "zod";

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