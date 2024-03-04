"use client"

import { DrawerContext, useDrawer } from "@/context/drawer.context";
import { useMediaQuery } from "@uidotdev/usehooks";
import React, { FC, SetStateAction, useEffect, useState } from "react";
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
import { useCreateVideo } from "../../../hooks/createVideo";
import { addMinutes } from "date-fns";
import sha256 from 'crypto-js/sha256'
import * as tus from 'tus-js-client'
import { Progress } from "../ui/progress";
import { useCreateCourseContent } from "../../../hooks/createCourseContent";
import { useParams } from "next/navigation";
import Dropzone from "../ui/dropzone";

interface DrawerDialogProps {
    title: string;
    subTitle: string;
    children: React.ReactNode;
    trigger: React.ReactNode;
    setOpenParent?: (value: SetStateAction<boolean>) => void;
    openParent?: boolean
}


export const DrawerDialog: FC<DrawerDialogProps> = ({ title, subTitle, children, trigger, openParent, setOpenParent }) => {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const value = { open, setOpen };

    if (isDesktop) {
        return (
            <DrawerContext.Provider value={setOpenParent ? { open: openParent!, setOpen: setOpenParent } : { open, setOpen }}>
                <Dialog open={openParent ?? open} onOpenChange={setOpenParent ?? setOpen}>
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
        <DrawerContext.Provider value={setOpenParent ? { open: openParent!, setOpen: setOpenParent } : { open, setOpen }}>
            <Drawer open={openParent ?? open} onOpenChange={setOpenParent ?? setOpen}>
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

export const CreateVideoForm: FC<{ file: File | null, lessonId: string }> = ({ file, lessonId }) => {
    const createCourseContent = useCreateCourseContent();
    const [uploadPercent, setUploadPercent] = useState(0);
    const createVideo = useCreateVideo();
    const { open, setOpen } = useDrawer();

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<{ title: string }>()



    useEffect(() => {
        if (createVideo.status === "success") {
            const signatureExpire = addMinutes(new Date(), 10).getTime()
            const shaed = sha256(140551 + "cf17ba05-57c7-47f3-9d965bdb1a7e-660a-415a" + signatureExpire + createVideo.data.guid).toString();
            if (file) {


                var upload = new tus.Upload(file, {
                    endpoint: "https://video.bunnycdn.com/tusupload",
                    retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
                    headers: {
                        AuthorizationSignature: shaed, // SHA256 signature (library_id + api_key + expiration_time + video_id)
                        AuthorizationExpire: signatureExpire.toString(), // Expiration time as in the signature,
                        VideoId: createVideo.data.guid, // The guid of a previously created video object through the Create Video API call
                        LibraryId: "140551",
                    },
                    metadata: {
                        filetype: file?.type,
                        title: file?.name
                    },
                    onError: function (error) {
                        console.log(error)
                    },
                    onProgress: function (bytesUploaded, bytesTotal) {
                        setUploadPercent(((bytesUploaded / bytesTotal) * 100))
                    },
                    onSuccess: function () {
                        createCourseContent.mutate({
                            lesson: lessonId,
                            lectureType: "video",
                            lectureConfig: {
                                id: createVideo.data.guid
                            }
                        })
                        // learncontent erstellen und entsprechend verlinken
                        // lösch Logik einbauen
                        // media player einbinden siehe https://iframe.mediadelivery.net/embed/${videolibraryId}/${videoId}?autoplay=false&loop=false&muted=false&preload=false
                        // getAllVideos({ collectionId: collectionId, libraryId: libraryId });
                    }
                })
                // Check if there are any previous uploads to continue.
                upload.findPreviousUploads().then(function (previousUploads) {
                    // Found previous uploads so we select the first one. 
                    if (previousUploads.length) {
                        upload.resumeFromPreviousUpload(previousUploads[0])
                    }

                    // Start the upload
                    upload.start()
                })
            }

        }
    }, [createVideo.status])


    async function submitNow(data: { title: string }) {
        createVideo.mutate(data);
    }

    return (
        <form onSubmit={handleSubmit(submitNow)} className={cn("grid items-start gap-4")}>
            <div className="grid gap-2">
                <InputLabel register={register} id="title" label="Titel" type="text" errors={errors} />
                {uploadPercent > 0 && <Progress value={uploadPercent} />}
            </div>
            <Button disabled={uploadPercent != 0} type="submit">Jetzt Hochladen</Button>
        </form>
    )
}

export const UpdateVideoForm: FC<{ lessonId: string }> = ({ lessonId }) => {
    const createCourseContent = useCreateCourseContent();
    const [uploadPercent, setUploadPercent] = useState(0);
    const createVideo = useCreateVideo();

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<{ title: string }>()


    const methods = useForm({
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
    });

    useEffect(() => {
        if (createVideo.status === "success") {
            const file = methods.getValues("file") as File;
            const signatureExpire = addMinutes(new Date(), 10).getTime()
            const shaed = sha256(140551 + "cf17ba05-57c7-47f3-9d965bdb1a7e-660a-415a" + signatureExpire + createVideo.data.guid).toString();
            if (file) {


                var upload = new tus.Upload(file, {
                    endpoint: "https://video.bunnycdn.com/tusupload",
                    retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
                    headers: {
                        AuthorizationSignature: shaed, // SHA256 signature (library_id + api_key + expiration_time + video_id)
                        AuthorizationExpire: signatureExpire.toString(), // Expiration time as in the signature,
                        VideoId: createVideo.data.guid, // The guid of a previously created video object through the Create Video API call
                        LibraryId: "140551",
                    },
                    metadata: {
                        filetype: file?.type,
                        title: file?.name
                    },
                    onError: function (error) {
                        console.log(error)
                    },
                    onProgress: function (bytesUploaded, bytesTotal) {
                        setUploadPercent(((bytesUploaded / bytesTotal) * 100))
                    },
                    onSuccess: function () {
                        createCourseContent.mutate({
                            lesson: lessonId,
                            lectureType: "video",
                            lectureConfig: {
                                id: createVideo.data.guid
                            }
                        })
                        // learncontent erstellen und entsprechend verlinken
                        // lösch Logik einbauen
                        // media player einbinden siehe https://iframe.mediadelivery.net/embed/${videolibraryId}/${videoId}?autoplay=false&loop=false&muted=false&preload=false
                        // getAllVideos({ collectionId: collectionId, libraryId: libraryId });
                    }
                })
                // Check if there are any previous uploads to continue.
                upload.findPreviousUploads().then(function (previousUploads) {
                    // Found previous uploads so we select the first one. 
                    if (previousUploads.length) {
                        upload.resumeFromPreviousUpload(previousUploads[0])
                    }

                    // Start the upload
                    upload.start()
                })
            }

        }
    }, [createVideo.status])


    async function submitNow(data: { title: string }) {
        createVideo.mutate(data);
    }

    function handleOnDrop(acceptedFiles: FileList | null) {
        if (acceptedFiles && acceptedFiles.length > 0) {
            methods.setValue("file", acceptedFiles[0]);
        } else {
            methods.setValue("file", null);
            methods.setError("file", {
                message: "File is required",
                type: "typeError",
            });
        }
    }

    return (

        <form onSubmit={handleSubmit(submitNow)} className={cn("grid items-start gap-4")}>
            <div className="grid gap-2">
                <Dropzone handleOnDrop={handleOnDrop} dropMessage="" />
                {uploadPercent > 0 && <Progress value={uploadPercent} />}
            </div>
            <Button disabled={uploadPercent != 0} type="submit">Jetzt Hochladen</Button>
        </form>
    )
}