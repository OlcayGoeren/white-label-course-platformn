import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db/access";
import { authOptions } from "../auth/[...nextauth]/authoptions";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const courses = await db.query.course.findMany({
            where: (course, { eq, and }) => and(eq(course.organization, session.user.organization))
        });

        const invoices = await db.query.invoice.findMany({
            where: (invoice, { eq }) => eq(invoice.user, session.user.id)
        });

        const coursesWithInvoices = courses.map((course) => {
            const foundMatchingInvoice = invoices.find((invoice) => invoice.course === course.id)
            if (foundMatchingInvoice) {
                return { ...course, enrolled: true };
            } else {
                return { ...course, enrolled: false };
            }
        })

        const modules = await db.query.modulee.findMany({
            where: (module, { eq, and, inArray }) => inArray(module.course, courses.map(ele => ele.id))
        });



        const coursesWithModules = coursesWithInvoices.filter((course) => {
            return modules.some((module) => module.course === course.id)
        })




        return NextResponse.json({ courses: coursesWithModules }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}