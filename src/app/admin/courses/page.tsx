"use client"
import { CourseTable, columns } from "@/components/self/CourseTable";
import Headline from "@/components/self/Headline";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { FC, useEffect } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseSchemaForm, CourseZodSchemaForm } from "@/types/courses";
import InputLabel from "@/components/self/InputLabel";
import TextAreaLabel from "@/components/self/TextAreaLabel";
import axios from "axios";
import { useGetCourses } from "../../../../hooks/getCourses";
import { useCreateCourse } from "../../../../hooks/createCourse";
import { DrawerContext, useDrawer } from "@/context/drawer.context";

interface DrawerDialogDemoProps {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
}

export const DrawerDialogDemo: FC<DrawerDialogDemoProps> = ({ title, subTitle, children, trigger }) => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const value = { open, setOpen };

  if (isDesktop) {
    return (
      <DrawerContext.Provider value={value}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {trigger}

          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                {subTitle}
              </DialogDescription>
            </DialogHeader>
            {children}

          </DialogContent>
        </Dialog>
      </DrawerContext.Provider>
    )
  }

  return (
    <DrawerContext.Provider value={value}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          {trigger}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>
              {subTitle}
            </DrawerDescription>
          </DrawerHeader>
          {children}
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </DrawerContext.Provider>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {

  const createCourse = useCreateCourse();
  const { open, setOpen } = useDrawer();

  const { register, handleSubmit, formState: { errors } } = useForm<CourseSchemaForm>({
    resolver: zodResolver(CourseZodSchemaForm)
  })

  useEffect(() => {
    if (createCourse.status === "success") {
      setOpen(false);

    }
  }, [createCourse.status])


  async function submitNow(data: CourseSchemaForm) {
    createCourse.mutate(data);
  }


  return (
    <form onSubmit={handleSubmit(submitNow)} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <InputLabel register={register} id="title" label="Titel" type="text" errors={errors} />
        <TextAreaLabel register={register} id="description" label="Beschreibung" errors={errors} />
        <InputLabel register={register} id="price" label="Preis" type="number" errors={errors} />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}



export default function Home() {

  const { data, isLoading, error } = useGetCourses();

  console.log(data, isLoading, error);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Headline variant="h1" color="black">
          Kurse
        </Headline>
        <DrawerDialogDemo title="Kurs erstellen" subTitle='Der erstellte Kurs wird initial auf den Status "Entwurf" gesetzt und kann später veröffentlicht werden.'
          trigger={<Button
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>}
        >
          <ProfileForm />
        </DrawerDialogDemo>
      </div>

      <div className="space-y-4">
        <CourseTable columns={columns} data={data?.courses ?? []} />
      </div>

    </>
  );
}
