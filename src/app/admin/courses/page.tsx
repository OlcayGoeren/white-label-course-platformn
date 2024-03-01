"use client"
import CourseCard from "@/components/self/CourseCard";
import { CourseTable, columns } from "@/components/self/CourseTable";
import Headline from "@/components/self/Headline";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/courses";
import { payments } from "@/lib/payments";
import { Plus } from "lucide-react";
import React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Kurs erstellen</DialogTitle>
            <DialogDescription>
              Der erstellte Kurs wird initial auf den Status "Entwurf" gesetzt und kann später veröffentlicht werden.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Kurs erstellen</DrawerTitle>
          <DrawerDescription>
            Der erstellte Kurs wird initial auf den Status "Entwurf" gesetzt und kann später veröffentlicht werden.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}



export default function Home() {



  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Headline variant="h1" color="black">
          Kurse
        </Headline>
        <DrawerDialogDemo />
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
