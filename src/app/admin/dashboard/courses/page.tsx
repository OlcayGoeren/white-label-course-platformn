"use client"
import { CourseTable, columns } from "@/components/self/CourseTable";
import Headline from "@/components/self/Headline";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

import { useGetCourses } from "../../../../../hooks/getCourses";
import { CreateCourseForm, DrawerDialog } from "@/components/self/DrawerDialogForm";
import LoadingIndicator from "@/components/self/LoadingIndicator";


export default function Home() {

  const { data, isLoading, error } = useGetCourses();


  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <>
      <div>
        <div className="flex flex-row items-center justify-between">
          <Headline variant="h1" color="black">
            Kurse
          </Headline>
          <DrawerDialog title="Kurs erstellen" subTitle='Der erstellte Kurs wird initial auf den Status "Entwurf" gesetzt und kann später veröffentlicht werden.'
            trigger={<Button
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>}
          >
            <CreateCourseForm />
          </DrawerDialog>
        </div>

        <div className="space-y-4">
          <CourseTable columns={columns} data={data?.courses ?? []} />
        </div>
      </div>
    </>
  );
}
