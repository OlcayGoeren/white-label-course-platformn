import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "../../../../db/access";
import { BuyInvoiceSchema, BuyInvoiceSchemaType } from "@/types/invoice";
import { invoice } from "../../../../db/schema";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const invoices = await db.query.invoice.findMany({
            where: (invoice, { eq, and }) => and(eq(invoice.organization, session.user.organization), eq(invoice.user, session.user.id)),
        })

        return NextResponse.json({ success: true, invoices }, { status: 200 })
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
        const parsedBody = BuyInvoiceSchema.parse(body);

        const course = await db.query.course.findFirst({
            where: (course, { eq }) => eq(course.id, parsedBody.id)
        })

        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 })
        }

        await db.insert(invoice).values({
            organization: session.user.organization,
            amount: course.price,
            user: session.user.id,
            course: parsedBody.id,
        });


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