"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetActiveCoursesByOrga } from "../../hooks/getActiveCoursesByOrganization";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useRouter } from "next/navigation";
import CourseTile from "@/components/self/CourseTile";

const CoursesOverview: FC = () => {

  const acitveCourses = useGetActiveCoursesByOrga();
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <main className="grid grid-cols-1  md:grid-cols-3 gap-2 ">
        {acitveCourses.data?.courses.map((course) => {
          return <CourseTile course={{ ...course, enrolled: false }} />
        })}
      </main>
    </div>
  );
}

export default CoursesOverview
