"use client"
import CourseCard from "@/components/self/CourseCard";
import { CourseTable, columns } from "@/components/self/CourseTable";
import Headline from "@/components/self/Headline";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/courses";
import { payments } from "@/lib/payments";
import { Plus } from "lucide-react";
import React from "react";





export default function Home() {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Headline variant="h1" color="black">
          Kurse
        </Headline>
        <Button
          
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <div className="space-y-4">
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:grid-cols-3"> */}
        {/* {courses.map((course, index) => <CourseCard key={index} description={course.description} image={course.image} title={course.title} />)} */}
        {/* </div> */}
        <CourseTable columns={columns} data={payments} />
      </div>

    </>
  );
}
