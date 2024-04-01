
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db/access";

export async function GET(request: NextRequest) {
    try {

        const hostname = request.nextUrl.hostname;

        const foundOrga = await db.query.organization.findFirst({
            where: (organization, { eq }) => eq(organization.domain, hostname),
        })

        if (!foundOrga) return NextResponse.json({ success: false, message: "No organization found" }, { status: 404 });

        const allCourses = await db.query.course.findMany({
            where: (course, { eq, and }) => and(eq(course.organization, foundOrga.id))
        })

        return NextResponse.json({ success: true, courses: allCourses }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}

// export async function POST(request: NextRequest) {
//     try {

//         const session = await getServerSession(authOptions);
//         if (!session) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//         }
//         const body = await request.json();
//         const validBody = CourseZodSchemaForm.parse(body);

//         const createdCourse = await db.insert(course).values({
//             title: validBody.title,
//             description: validBody.description,
//             status: validBody.status,
//             price: validBody.price,
//             instructor: session.user.id,
//             organization: session.user.organization,
//         }).returning();

//         return NextResponse.json({ success: true, course: createdCourse[0].id }, { status: 200 })
//     } catch (error) {

//         console.error(error);
//         return NextResponse.json({ error }, { status: 400 })
//     }
// }

// export async function PUT(request: NextRequest) {
//     try {
//         const session = await getServerSession(authOptions);
//         if (!session) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//         }
//         const body = await request.json() as UpdateCourseOrder;

//         body.modules.forEach(async (moduleEle) => {
//             const result = await db.update(moduleSchema)
//                 .set({ order: moduleEle.order })
//                 .where(eq(moduleSchema.id, moduleEle.id)).returning(({ updatedId: moduleSchema.id }));
//         });
//         body.lessons.forEach(async (lessonsEle) => {
//             const result = await db.update(lesson)
//                 .set({ order: lessonsEle.order, module: lessonsEle.module })
//                 .where(eq(lesson.id, lessonsEle.id));
//         });
//         return NextResponse.json({ success: true }, { status: 200 })
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error }, { status: 400 })
//     }
// }

// export async function DELETE(request: NextRequest) {
//     try {
//         return NextResponse.json({ success: true }, { status: 200 })
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error }, { status: 400 })
//     }
// }