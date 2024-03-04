import { CourseZodSchemaForm } from "@/types/courses";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { authOptions } from "../../auth/[...nextauth]/route";
import axios from "axios";
import { CreateVideoRequest } from "../../../../../hooks/createVideo";

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


        const url = 'https://video.bunnycdn.com/library/140551/videos';
        const headers = {
            accept: 'application/json',
            'content-type': 'application/*+json',
            AccessKey: 'cf17ba05-57c7-47f3-9d965bdb1a7e-660a-415a'
        }

        const result = await axios.post(url, null, { headers })

        return NextResponse.json({ ...result.data }, { status: 200 })
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