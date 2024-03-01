"use client"
import { FC, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

import Headline from "@/components/self/Headline"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ExternalLink, Plus } from "lucide-react"
import { KanbanBoard } from "@/components/kanban/KanbanBoard"


const SingleCourseAdmin: FC = () => {
    const params = useParams<{ id: string }>()
    const searchParams = useSearchParams()

    const searchTerms = searchParams.get("section");

    const [first, setFirst] = useState<"course" | "settings" | "participants">("course")

    useEffect(() => {
        searchTerms === "course" && setFirst("course")

        searchTerms === "settings" && setFirst("settings")

        searchTerms === "participants" && setFirst("participants")

    }, [searchTerms])





    return <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3">
            <img width={350} height={150} src={"https://via.placeholder.com/350x150"} alt={"random"} />
            <div className="flex flex-col  justify-between">
                <Headline variant="h1" color="black">
                    Beginner: JavaScript
                </Headline>

                <div className="flex flex-row gap-3">
                    <Link className={cn("text-xl text-gray-700 font-medium", (first === "course" && "font-bold text-black"))} href={"/admin/courses/" + params.id + "?section=course"}>Kurs</Link>
                    <Link className={cn("text-xl text-gray-700 font-medium", (first === "settings" && "font-bold text-black"))} href={"/admin/courses/" + params.id + "?section=settings"}>Einstellungen</Link>
                    <Link className={cn("text-xl text-gray-700 font-medium", (first === "participants" && "font-bold text-black"))} href={"/admin/courses/" + params.id + "?section=participants"}>Teilnehmer</Link>
                </div>

            </div>
        </div>

        <div className="flex flex-row gap-3">
            <Button className="" variant={"outline"}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Preview</Button>
            <Button>
                <Plus className="mr-2 h-4 w-4" />
                Modul Hinzufügen
            </Button>
        </div>

        <div className="">
            <KanbanBoard />

        </div>

    </div>
}


export default SingleCourseAdmin