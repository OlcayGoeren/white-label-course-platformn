import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "../../../../../db/access";
import { module as myModule } from "../../../../../db/schema";
import { and, eq } from "drizzle-orm";

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


export async function DELETE(request: Request,
    { params }: { params: { slug: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const result = await db.delete(myModule).where(and(eq(myModule.id, params.slug))).returning();
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}