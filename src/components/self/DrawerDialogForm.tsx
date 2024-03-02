"use client"

import { DrawerContext, useDrawer } from "@/context/drawer.context";
import { useMediaQuery } from "@uidotdev/usehooks";
import React, { FC, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Button } from "../ui/button";
import { useCreateCourse } from "../../../hooks/createCourse";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseZodSchemaForm } from "@/types/courses";
import { useForm } from "react-hook-form";
import InputLabel from "./InputLabel";
import TextAreaLabel from "./TextAreaLabel";
import { cn } from "@/lib/utils";
import { ModuleWithAllRelations, ModuleZodSchemaForm } from "@/types/modules";
import { useCreateModule } from "../../../hooks/createModule";
import { useDeleteModule } from "../../../hooks/deleteModule";
import { LessonSchemaForm, LessonZodSchemaForm } from "@/types/lessons";
import { useCreateLesson } from "../../../hooks/createLesson";

interface DrawerDialogProps {
    title: string;
    subTitle: string;
    children: React.ReactNode;
    trigger: React.ReactNode;
}


export const DrawerDialog: FC<DrawerDialogProps> = ({ title, subTitle, children, trigger }) => {
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

export function CreateCourseForm({ className }: React.ComponentProps<"form">) {

    const createCourse = useCreateCourse();
    const { open, setOpen } = useDrawer();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(CourseZodSchemaForm)
    })

    useEffect(() => {
        if (createCourse.status === "success") {
            setOpen(false);

        }
    }, [createCourse.status])


    async function submitNow(data: any) {
        createCourse.mutate(data);
    }


    return (
        <form onSubmit={handleSubmit(submitNow)} className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <InputLabel register={register} id="title" label="Titel" type="text" errors={errors} />
                <TextAreaLabel register={register} id="description" label="Beschreibung" errors={errors} />
                <InputLabel register={register} id="price" label="Preis" type="number" errors={errors} />
            </div>
            <Button type="submit">Speichern</Button>
        </form>
    )
}


export const CreateModuleForm: FC<{ modules: ModuleWithAllRelations[] }> = ({ modules }) => {

    const createModule = useCreateModule();
    const { open, setOpen } = useDrawer();

    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ModuleZodSchemaForm)
    })

    useEffect(() => {
        const highestOrderModule = modules.reduce((prev, current) => {
            return (prev.order > current.order) ? prev : current;
        });
        setValue("order", highestOrderModule.order + 1);
        setValue("course", modules[0].course);
    }, [])

    useEffect(() => {
        if (createModule.status === "success") {
            setOpen(false);

        }
    }, [createModule.status])


    async function submitNow(data: any) {
        createModule.mutate(data);
    }

    return (
        <form onSubmit={handleSubmit(submitNow)} className={cn("grid items-start gap-4")}>
            <div className="grid gap-2">
                <InputLabel register={register} id="title" label="Titel" type="text" errors={errors} />
                <input hidden type="number" {...register("order")} />
                <input hidden type="text" {...register("course")} />
            </div>
            <Button type="submit">Speichern</Button>
        </form>
    )
}

export const RemoveModuleForm: FC<{ moduleId: string }> = ({ moduleId }) => {

    const deleteModule = useDeleteModule();
    const { open, setOpen } = useDrawer();

    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ModuleZodSchemaForm)
    })

    useEffect(() => {
        if (deleteModule.status === "success") {
            setOpen(false);

        }
    }, [deleteModule.status])


    async function submitNow(data: any) {
        deleteModule.mutate({ moduleId: moduleId });
    }

    return (
        <form onSubmit={submitNow} className={cn("grid items-start gap-4")}>
            <div className="grid gap-2">
            </div>
            <Button variant={"destructive"} type="submit">Entfernen</Button>
        </form>
    )
}

export const CreateLessonForm: FC<{ moduleId: string, totalTaskCount: number }> = ({ moduleId, totalTaskCount }) => {

    const createLesson = useCreateLesson();
    const { open, setOpen } = useDrawer();

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<LessonSchemaForm>({
        resolver: zodResolver(LessonZodSchemaForm)
    })

    useEffect(() => {
        setValue("module", moduleId);
        setValue("order", totalTaskCount);

    }, [])

    useEffect(() => {
        if (createLesson.status === "success") {
            setOpen(false);

        }
    }, [createLesson.status])


    async function submitNow(data: LessonSchemaForm) {
        createLesson.mutate(data);
    }

    return (
        <form onSubmit={handleSubmit(submitNow)} className={cn("grid items-start gap-4")}>
            <div className="grid gap-2">
                <InputLabel register={register} id="title" label="Titel" type="text" errors={errors} />
                <InputLabel register={register} id="description" label="Beschreibung" type="text" errors={errors} />
                <input hidden type="text" {...register("module")} />
                <input hidden type="number" {...register("order", { valueAsNumber: true })} />
            </div>
            <Button type="submit">Hinzufügen</Button>
        </form>
    )
}