import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db/access";

export async function GET(request: NextRequest) {
    try {

        const hostname = request.nextUrl.hostname;
        const og = await db.query.organization.findFirst({
            where: (organization, { eq, and }) => and(eq(organization.domain, hostname)),
        })
        return NextResponse.json({ success: true, organization: og }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}

export async function POST(request: NextRequest) {
    try {
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