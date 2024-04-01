import { CourseZodSchemaForm } from "@/types/courses";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import axios from "axios";
import { authOptions } from "../../auth/[...nextauth]/authoptions";

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
        // triggern bei organization erstellung
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const headers = {
            accept: 'application/json',
            'content-type': 'application/*+json',
            AccessKey: 'cf17ba05-57c7-47f3-9d965bdb1a7e-660a-415a'
        };

        const url = 'https://video.bunnycdn.com/library/140551/collections';
        const result = await axios.post(url, {
            name: session.user.organization
        }, { headers: headers })

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