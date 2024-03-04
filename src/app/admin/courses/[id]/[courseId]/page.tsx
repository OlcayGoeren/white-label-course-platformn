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
import { lesson } from "../../../../../../db/schema"
import { VideoConfigSchema, videoConfigSchema } from "@/types/courseContent"
import EditorConvertToHTML from "@/components/self/EditorConvertToHTML"



const VideoEditBoard: FC<{ lesson: LessonWithAllRelations }> = ({ lesson }) => {

    // @ts-ignore
    const videoConfig: VideoConfigSchema = lesson.courseContents[0].lectureConfig;

    return <>
        < p > Edit Board</p>
        <iframe className="" allowFullScreen src={`https://iframe.mediadelivery.net/embed/140551/${(videoConfig.id)}?autoplay=false&loop=false&muted=false&preload=false`} />
        <DrawerDialog
            title="Video ändern"
            subTitle="Das alte Video wird entfernt und das neue hinzugefügt. Sind sie sich sicher?"
            trigger={<Button>Video ändern</Button>}
        >
            <></>
        </DrawerDialog>
        <EditorConvertToHTML />
    </>
}


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
            methods.setValue("file", acceptedFiles[0]);
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


    // TODO: 
    // Dropdown im Edit Board anzeigen
    // Im Frontend Logik einbauen, dass man nur gleichzeitig einen Content hat. Beim Speichern nach dem Switchen Verweis
    // geben, dass alte Inhalt entfernt wird.
    // Bei video switch sicher gehen, dass video von bunny entfernt wird

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


        {lessonFound.courseContents.length > 0 ? <VideoEditBoard lesson={lessonFound} />
            : <>
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
                    <CreateVideoForm lessonId={params.courseId} file={methods.watch("file")} />
                </DrawerDialog>
            </>
        }


    </>
}
export default SingleCourseAdmin