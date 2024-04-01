"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetActiveCoursesByOrga } from "../../hooks/getActiveCoursesByOrganization";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useRouter } from "next/navigation";
import CourseTile from "@/components/self/CourseTile";
import Header from "@/components/self/header";

const CoursesOverview: FC = () => {

  const acitveCourses = useGetActiveCoursesByOrga();
  const router = useRouter();

  return (
    <>
    <Header/>
      <div className="flex justify-center items-center min-h-screen">
        <main className="grid grid-cols-1  gap-2 max-w-xl ">
          {acitveCourses.data?.courses.map((course) => {
            return <CourseTile key={course.id} course={{ ...course, enrolled: false }} />
          })}
        </main>
      </div>
    </>
  );
}

export default CoursesOverview
