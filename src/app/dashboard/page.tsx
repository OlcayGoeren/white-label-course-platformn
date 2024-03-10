"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { useFetchCoursesWithEnrollments } from "../../../hooks/getCoursesWithEnrollments";
import CourseTile from "@/components/self/CourseTile";

export default function Dashboard() {
    const { data: fetchedCourses } = useFetchCoursesWithEnrollments();
    /**
     * 1. Fetch all active Courses
     * 2. Visuell differenzieren zwischen gekauften und nicht gekauften Kursen
     * 3. Weiter zu Kursdetails navigieren
     */

    console.log(fetchedCourses)

    return <>
        <div className="flex justify-center items-center min-h-screen">
            <main className="grid grid-cols-1  md:grid-cols-3 gap-2 ">
                {fetchedCourses?.courses.map((course) => {
                    return <CourseTile course={{ ...course }} />
                })}
            </main>
        </div>
    </>
}