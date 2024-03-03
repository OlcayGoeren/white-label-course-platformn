"use client"
import { FC, useCallback, useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"

import Headline from "@/components/self/Headline"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ExternalLink, Plus } from "lucide-react"
import KanbanBoard from "@/components/kanban/KanbanBoard"
import { CreateCourseForm, CreateModuleForm, CreateVideoForm, DrawerDialog } from "@/components/self/DrawerDialogForm"
import { Column } from "@/components/kanban/BoardColumn"
import { Task } from "@/components/kanban/TaskCard"
import { ColumnsAndTasksContext } from "@/context/columnsTasks.context"
import _ from "lodash"
import { useGetAllCourseDetails } from "../../../../../../hooks/getAllCourseDetails"
import { LessonWithAllRelations } from "@/types/lessons"
import InputLabel from "@/components/self/InputLabel"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Dropzone from "@/components/ui/dropzone"
import { useCreateVideo } from "../../../../../../hooks/createVideo"


const SingleCourseAdmin: FC = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const createVideo = useCreateVideo()
    const defaultValues: { file: null | File } = {
        file: null,
    };
    const methods = useForm({
        defaultValues,
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
    });



    const router = useRouter();
    const params = useParams<{ id: string, courseId: string }>();
    const { data } = useGetAllCourseDetails(params.id);

    let lessonFound: LessonWithAllRelations | undefined = undefined;
    outerLoop: if (data?.modulesWithRelations) { // Hinzugefügt, um sicherzustellen, dass data nicht null oder undefined ist
        for (const module of data.modulesWithRelations) {
            for (const lesson of module.lessons) {
                if (lesson.id === params.courseId) {
                    lessonFound = lesson;
                    break outerLoop; // Bricht beide Schleifen ab, wenn die Bedingung erfüllt ist
                }
            }
        }
    }

    const { register: titleRegister, setValue: setValueTitle, formState: { errors: titleError } } = useForm<{ title: string }>({
        defaultValues: {
            title: lessonFound?.title
        }
    });

    function handleOnDrop(acceptedFiles: FileList | null) {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const allowedTypes = [
                { name: "csv", types: ["text/csv"] },
                {
                    name: "excel",
                    types: [
                        "application/vnd.ms-excel",
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    ],
                },
            ];
            const fileType = allowedTypes.find((allowedType) =>
                allowedType.types.find((type) => type === acceptedFiles[0].type)
            );
            methods.setValue("file", acceptedFiles[0]);
            // );
            // if (!fileType) {
            //     methods.setValue("file", null);
            //     methods.setError("file", {
            //         message: "File type is not valid",
            //         type: "typeError",
            //     });
            // } else {
            //     methods.setValue("file", acceptedFiles[0]);
            //     methods.clearErrors("file");



            // }
        } else {
            methods.setValue("file", null);
            methods.setError("file", {
                message: "File is required",
                type: "typeError",
            });
        }
    }


    useEffect(() => {
        if (methods.watch("file")) {
            setOpenDrawer(true)
        }
    }, [methods.watch("file")])




    if (!lessonFound) {
        return <p>Not Found</p>
    }




    return <>
        <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-3 items-center">
                    <ArrowLeft size={21} />
                    <Button onClick={() => router.back()} className="text-lg" variant={"link"}>Zurück</Button>
                </div>
                <div className="">
                    <Headline variant="h1">
                        {lessonFound.title}
                    </Headline>
                    <Headline variant="sub">
                        {lessonFound.description}
                    </Headline>
                </div>
            </div>
            <div className="flex flex-row gap-3">
                <Button variant={"outline"}>Preview</Button>
                <Button >Speichern</Button>
            </div>
        </div>

        <div className="flex flex-col w-[40vw]">
            <InputLabel id="title" register={titleRegister} label="Submodule Titel" type="text" errors={titleError} />
        </div>


        <div className="grid grid-cols-1">
            <Select >
                <SelectTrigger className="w-[120px]" >
                    <SelectValue placeholder={"Auswählen"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value={"Bla"}>Video</SelectItem>
                        <SelectItem value={"Bfela"}>Rich-Text</SelectItem>
                        <SelectItem value={"Bewffewla"}></SelectItem>
                        <SelectItem value={"Blweffwea"}>Bla</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>

        <Dropzone
            classNameWrapper="w-[20vw] h-[20vh]"
            dropMessage="Drop files or click here"
            handleOnDrop={handleOnDrop}
        />

        <DrawerDialog openParent={openDrawer} setOpenParent={setOpenDrawer} title="Video hochladen" subTitle="Bitte geben Sie einen Titel ein"
            trigger={<> </>}
        >
            <CreateVideoForm file={methods.watch("file")} />
        </DrawerDialog>
    </>
}
export default SingleCourseAdmin