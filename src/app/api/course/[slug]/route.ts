import { NextResponse } from "next/server";

// /answer/a --> slug=a
export async function GET(request: Request,
    { params }: { params: { slug: string } }) {
    try {
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}