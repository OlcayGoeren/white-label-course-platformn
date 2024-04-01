"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { useFetchCoursesWithEnrollments } from "../../../hooks/getCoursesWithEnrollments";
import CourseTile from "@/components/self/CourseTile";
import LoadingIndicator from "@/components/self/LoadingIndicator";

export default function Dashboard() {
    const { data: fetchedCourses, isLoading } = useFetchCoursesWithEnrollments();


    if (isLoading) {
        return <LoadingIndicator/>
    }

    return <>
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-xl font-bold">Meine Kurse</h1>
            <main className="grid grid-cols-1  gap-2 w-96">
                {fetchedCourses?.courses.map((course) => {
                    return <div key={course.id} className="w-fit"> <CourseTile course={{ ...course }} /></div>
                })}
            </main>
        </div>
    </>
}