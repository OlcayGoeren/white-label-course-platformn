import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "../../../../../db/access";
import { and, eq } from "drizzle-orm";
import { authOptions } from "../../auth/[...nextauth]/authoptions";
import { modulee } from "../../../../../db/schema";


export async function DELETE(request: Request,
    { params }: { params: { slug: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const result = await db.delete(modulee).where(and(eq(modulee.id, params.slug))).returning();
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}