"use client"
import { FC, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

import Headline from "@/components/self/Headline"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { DeleteLernContentForm, DrawerDialog } from "@/components/self/DrawerDialogForm"
import _ from "lodash"
import { useGetAllCourseDetails } from "../../../../../../../hooks/getAllCourseDetails"
import { LessonWithAllRelations } from "@/types/lessons"
import InputLabel from "@/components/self/InputLabel"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Dropzone from "@/components/ui/dropzone"
import { useCreateVideo } from "../../../../../../../hooks/createVideo"
import { Quiz, videoConfigSchema } from "@/types/courseContent"
import EditorConvertToHTML from "@/components/self/EditorConvertToHTML"
import { addMinutes } from "date-fns"
import { SHA256 } from "crypto-js"
import * as tus from 'tus-js-client'
import { useUpdateCourseContent } from "../../../../../../../hooks/updateCourseContentVideo"
import { Progress } from "@/components/ui/progress"
import { useDeleteVideo } from "../../../../../../../hooks/deleteVideo"
import QuizWrapper from "@/components/self/Quiz"
import VideoAndRichText from "@/components/self/VideoAndRichText"
import LoadingIndicator from "@/components/self/LoadingIndicator"


const QuizEdit: FC<{ lesson: LessonWithAllRelations }> = ({ lesson }) => {
    const [loader, setLoader] = useState(false);
    const updateCourseContent = useUpdateCourseContent();


    function update(quizzes: Quiz[]) {
        setLoader(true)
        updateCourseContent.mutate({
            id: lesson.courseContents[0].id,
            lectureType: "quiz",
            lectureConfig: {
                quizzes
            },
            lesson: lesson.id
        })
    }

    useEffect(() => {
        if (updateCourseContent.status === "success") {
            setLoader(false)
        }
    }, [updateCourseContent.status])


    return <>
        {loader && <LoadingIndicator />}
        <QuizWrapper foundLesson={lesson} customUpdate={update} />
    </>
}


const VideoEditBoard: FC<{ lesson: LessonWithAllRelations }> = ({ lesson }) => {

    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const videoConfig = videoConfigSchema.parse(lesson.courseContents[0].lectureConfig);

    const [file, setFile] = useState<File>()
    const [richtext, setRichtext] = useState(videoConfig.richText ?? "");

    const createVideo = useCreateVideo();
    const [uploadPercent, setUploadPercent] = useState(0);
    const updateCourseContent = useUpdateCourseContent();
    const deleteVideo = useDeleteVideo();

    const [open, setOpen] = useState(false)

    function handleOnDrop(acceptedFiles: FileList | null) {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setOpen(true)
        } else {
            setFile(undefined);
        }
    }

    useEffect(() => {
        if (createVideo.data) {
            const signatureExpire = addMinutes(new Date(), 10).getTime()
            const shaed = SHA256(140551 + "cf17ba05-57c7-47f3-9d965bdb1a7e-660a-415a" + signatureExpire + createVideo.data.guid).toString();
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
                        //
                    },
                    onProgress: function (bytesUploaded, bytesTotal) {
                        setUploadPercent(((bytesUploaded / bytesTotal) * 100))
                    },
                    onSuccess: function () {
                        deleteVideo.mutate({ videoId: videoConfig.id })
                        updateCourseContent.mutate({
                            id: lesson.courseContents[0].id,
                            lectureType: "video",
                            lectureConfig: {
                                id: createVideo.data.guid,
                                richText: richtext
                            },
                            lesson: lesson.id
                        })
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
    }, [createVideo.data])

    useEffect(() => {
        if (updateCourseContent.status === "success") {
            setOpen(false)
            setLoadingSpinner(false)
        }
    }, [updateCourseContent.status])


    function updateRichText() {
        setLoadingSpinner(true)
        updateCourseContent.mutate({
            id: lesson.courseContents[0].id,
            lesson: lesson.id,
            lectureType: "video",
            lectureConfig: {
                id: videoConfig.id,
                richText: richtext
            }
        })
    }



    return <>
        {
            loadingSpinner && <LoadingIndicator />
        }
        <iframe className="" allowFullScreen src={`https://iframe.mediadelivery.net/embed/140551/${(videoConfig.id)}?autoplay=false&loop=false&muted=false&preload=false`} />

        <div className="w-44">
            <Dropzone
                className="w-fit"
                dropMessage="Video ändern"
                handleOnDrop={handleOnDrop}
            />
        </div>
        <DrawerDialog
            title="Video hochladen"
            subTitle="Sind Sie sich sicher?"
            trigger={<> </>}
            openParent={open}
            setOpenParent={setOpen}

        >
            {uploadPercent > 0 && <Progress value={uploadPercent} />}
            <Button onClick={() => createVideo.mutate({})}>Video Ändern</Button>
        </DrawerDialog>
        <EditorConvertToHTML setText={setRichtext} text={richtext} />
        <Button onClick={updateRichText}>Änderungen speichern</Button>
    </>
}


const SingleCourseAdmin: FC = () => {
    const router = useRouter();
    const params = useParams<{ id: string, courseId: string }>();
    const { data, isLoading } = useGetAllCourseDetails(params.id);
    const currentUrl = window.location.href;
    const searchParams = useSearchParams();

    const [selectedValue, setSelectedValue] = useState<"video" | "quiz">("video")

    let lessonFound: LessonWithAllRelations | undefined = undefined;
    outerLoop: if (data?.modulesWithRelations) { // Hinzugefügt, um sicherzustellen, dass data nicht null oder undefined ist
        for (const modulee of data.modulesWithRelations) {
            for (const lesson of modulee.lessons) {
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



    function selectFilledComponents(courseContent: LessonWithAllRelations) {
        switch (courseContent.courseContents[0].lectureType) {
            case "video":
                return <VideoEditBoard lesson={courseContent} />
            case "quiz":
                return <QuizEdit lesson={courseContent} />
            default:
                return <p>Not Found???</p>
        }
    }

    function selectEmptyComponents() {
        switch (selectedValue) {
            case "video":
                return <VideoAndRichText lesson={lessonFound!} />
            case "quiz":
                return <QuizWrapper foundLesson={lessonFound!} />
            default:
                return <p>Not Found!!!</p>
        }
    }


    if (isLoading) {
        return <LoadingIndicator />
    }


    if (!lessonFound) {
        return <p>Not Found</p>
    }


    return <>
        <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-3 items-center">
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
                <DrawerDialog
                    trigger={<Button variant={"destructive"}>Löschen</Button>}
                    title="Lerninhalt löschen"
                    subTitle="Sind Sie sicher, dass Sie diesen Lerninhalt löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden."
                >
                    <DeleteLernContentForm courseContentId={params.courseId}
                        // @ts-ignore
                        videoId={lessonFound.courseContents.length > 0 ? lessonFound.courseContents[0].lectureType === "video" ? (lessonFound.courseContents[0].lectureConfig.id) : null : null} />
                </DrawerDialog>
            </div>
        </div>


        {lessonFound.courseContents.length > 0 ?
            selectFilledComponents(lessonFound)
            :
            <>
                <div className="grid grid-cols-1">
                    <Select
                        onValueChange={(e: "video" | "quiz") => setSelectedValue(e)}
                        value={selectedValue}
                    >
                        <SelectTrigger className="w-[120px]" >
                            <SelectValue placeholder={"Auswählen"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={"video"}>Video</SelectItem>
                                <SelectItem value={"quiz"}>Quiz</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {selectEmptyComponents()}
            </>


        }


    </>
}
export default SingleCourseAdmin