"use client"
import { FC, useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"

import Headline from "@/components/self/Headline"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ExternalLink, Plus } from "lucide-react"
import { useGetAllCourseDetails } from "../../../../../../hooks/getAllCourseDetails"
import KanbanBoard from "@/components/kanban/KanbanBoard"
import { CreateModuleForm, DrawerDialog } from "@/components/self/DrawerDialogForm"
import { Column } from "@/components/kanban/BoardColumn"
import { Task } from "@/components/kanban/TaskCard"
import { ColumnsAndTasksContext } from "@/context/columnsTasks.context"
import _ from "lodash"
import { useUpdateCourseOrder } from "../../../../../../hooks/updateCourseOrder"
import { useGetCourses } from "../../../../../../hooks/getCourses"
import LoadingIndicator from "@/components/self/LoadingIndicator"


const SingleCourseAdmin: FC = () => {
    const updateCourseOrder = useUpdateCourseOrder();
    const [columns, setColumns] = useState<Column[]>([])
    const [tasks, setTasks] = useState<Task[]>([])
    const params = useParams<{ id: string }>()
    const { data, dataUpdatedAt } = useGetAllCourseDetails(params.id);
    const { data: courses } = useGetCourses();

    const [updatet, setUpdatet] = useState(false);

    const searchParams = useSearchParams()

    const searchTerms = searchParams.get("section");

    const [first, setFirst] = useState<"course" | "settings" | "participants">("course")

    useEffect(() => {
        searchTerms === "course" && setFirst("course")
        searchTerms === "settings" && setFirst("settings")
        searchTerms === "participants" && setFirst("participants")
    }, [searchTerms])


    function showChangeButton() {
        setUpdatet(true)
    }

    const memoKanban = useMemo(() => {
        return <KanbanBoard setUpdatet={showChangeButton} key={Date.now()} modules={data?.modulesWithRelations ?? []} />
    }, [data?.modulesWithRelations])


    function updateOrder() {
        setUpdatet(false)

        const courseId = params.id;
        const modules = columns.map((col, index) => {
            return {
                id: String(col.id),
                order: index,
                organization: col.organization
            }
        });
        const lessons: any = tasks.map(task => task.id);
        const groupedLessons = _.groupBy(tasks, "columnId");

        Object.keys(groupedLessons).forEach((columnId, groupIndex) => {
            groupedLessons[columnId].forEach((task, index) => {
                lessons.push({
                    id: task.id,
                    order: index,
                    columnId: task.columnId,
                    organization: task.organization,
                    module: task.columnId
                })
            });
        });

        updateCourseOrder.mutate({
            courseId: courseId,
            lessons: lessons,
            modules: modules
        })
    }


    if (!data && !courses) return <LoadingIndicator />


    return <ColumnsAndTasksContext.Provider value={{ columns, setColumns, setTasks, tasks }}>
        <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3">
                <img width={350} height={150} src={"https://via.placeholder.com/350x150"} alt={"example"} />
                <div className="flex flex-col  justify-between">
                    <Headline variant="h1" color="black">
                        {courses?.courses.find(course => course.id === params.id)?.title ?? "Kursname"}
                    </Headline>

                    <div className="flex flex-row gap-3">
                        <Link className={cn("text-xl text-gray-700 font-medium", (first === "course" && "font-bold text-black"))} href={"/admin/dashboard/courses/" + params.id + "?section=course"}>Kurs</Link>
                        <Link className={cn("text-xl text-gray-700 font-medium", (first === "settings" && "font-bold text-black"))} href={"/admin/dashboard/courses/" + params.id + "?section=settings"}>Einstellungen</Link>
                        <Link className={cn("text-xl text-gray-700 font-medium", (first === "participants" && "font-bold text-black"))} href={"/admin/dashboard/courses/" + params.id + "?section=participants"}>Teilnehmer</Link>
                    </div>

                </div>
            </div>

            <div className="flex flex-row gap-3">
                <Button className="" variant={"outline"}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Preview
                </Button>

                <DrawerDialog
                    title="Modul hinzufügen"
                    subTitle="Hier können Sie ein neues Modul hinzufügen"
                    trigger={<Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Modul Hinzufügen
                    </Button>}>
                    <CreateModuleForm courseId={params.id} modules={data?.modulesWithRelations ?? []} />
                </DrawerDialog>
                {updatet && <Button onClick={updateOrder} variant={"destructive"}>Reihenfolge aktualisieren</Button>}
            </div>

            <div className="">
                {memoKanban}
            </div>

        </div>
    </ColumnsAndTasksContext.Provider>
}


export default SingleCourseAdmin