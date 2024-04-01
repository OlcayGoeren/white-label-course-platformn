import { FC, useEffect, useState } from "react";
import Dropzone from "../ui/dropzone";
import { CreateVideoForm, DrawerDialog } from "./DrawerDialogForm";
import { LessonWithAllRelations } from "@/types/lessons";
import { useForm } from "react-hook-form";
import EditorConvertToHTML from "./EditorConvertToHTML";
import { Button } from "../ui/button";




const VideoAndRichText: FC<{ lesson: LessonWithAllRelations }> = ({ lesson }) => {
    const [text, setText] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false)
    const defaultValues: { file: null | File } = {
        file: null,
    };
    const methods = useForm({
        defaultValues,
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
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


    return <> <Dropzone
        classNameWrapper="w-[20vw] h-[20vh]"
        dropMessage="Drop files or click here"
        handleOnDrop={handleOnDrop}
    />

        <DrawerDialog openParent={openDrawer} setOpenParent={setOpenDrawer} title="Video hochladen" subTitle="Sind Sie sich sicher?"
            trigger={<> </>}
        >
            <CreateVideoForm setDrawer={setOpenDrawer} lessonId={lesson.id} file={methods.watch("file")} />
        </DrawerDialog>

        <EditorConvertToHTML setText={setText} text={text} />
        <Button>Speichern</Button>
    </>
}

export default VideoAndRichText;