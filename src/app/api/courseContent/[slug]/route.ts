import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "../../../../../db/access";
import { courseContent } from "../../../../../db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(request: Request,
    { params }: { params: { slug: string } }) {
    try {

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }


        const { slug } = params;
        const deleted = await db.delete(courseContent).where(eq(courseContent.id, slug)).returning();
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}