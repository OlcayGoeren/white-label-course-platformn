import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { LessonZodSchemaForm } from "@/types/lessons";
import { db } from "../../../../db/access";
import { lesson } from "../../../../db/schema";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

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

        const parsedBody = LessonZodSchemaForm.parse(body);
        const insertedModule = await db.insert(lesson).values({
            organization: session.user.organization,
            title: parsedBody.title,
            description: parsedBody.description,
            module: parsedBody.module,
            status: parsedBody.status,
            allowPreview: parsedBody.allowPreview,
            order: parsedBody.order
        }).returning();
        return NextResponse.json({ success: true }, { status: 200 })
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