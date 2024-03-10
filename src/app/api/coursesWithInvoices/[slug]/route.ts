import { NextResponse } from "next/server";
import { db } from "../../../../../db/access";
import { and } from "drizzle-orm";
import { ModuleWithAllRelations } from "@/types/modules";
import { LessonWithAllRelations } from "@/types/lessons";
import { CourseContentchema } from "@/types/courseContent";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// /answer/a --> slug=a
export async function GET(request: Request,
    { params }: { params: { slug: string } }) {
    try {


        return NextResponse.json({}, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}