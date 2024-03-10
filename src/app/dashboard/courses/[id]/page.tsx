"use client"

import { useParams } from "next/navigation";
import { FC } from "react";
import { useGetAllCourseDetails } from "../../../../../hooks/getAllCourseDetails";
import { Button } from "@/components/ui/button";
import Link from "next/link";



const SingleCourseSell: FC = () => {
    const params = useParams<{ id: string }>();
    const { data: course } = useGetAllCourseDetails(params.id);

    console.log(course?.modulesWithRelations);

    return <>
        <div className="space-y-3">
            {course?.modulesWithRelations.map((module) => {
                return <div className="rounded-lg p-2 border-2 border-lightGray">
                    <h2 className="font-bold text-xl pb-4">{module.title}</h2>
                    <div className="flex flex-col items-start justify-start gap-2">
                        {module.lessons.map((lesson) => {
                            return <Link className="hover:underline" href={"/dashboard/courses/" + params.id + "/" + lesson.id}>{lesson.title}</Link>
                        })}
                    </div>
                </div>
            })}
        </div>
    </>
}

export default SingleCourseSell;