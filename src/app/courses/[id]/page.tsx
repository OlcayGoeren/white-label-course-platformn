"use client"
import Headline from "@/components/self/Headline";
import Header from "@/components/self/header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BarChart, Clock2, Library, Video } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useGetAllCourseDetailsPublic } from "../../../../hooks/getAllCourseDetailsPublic";
import { signIn, useSession } from "next-auth/react";
import { useGetInvoices } from "../../../../hooks/getInvoices";
import { useCreateInvoice } from "../../../../hooks/createInvoice";
import LoadingIndicator from "@/components/self/LoadingIndicator";


const SingleCourseSell: FC = () => {
    const params = useParams<{ id: string }>();
    const { data, isLoading } = useGetAllCourseDetailsPublic(params.id);
    const { data: sessionData } = useSession();
    const { data: invoices, isLoading: loadingInvoices } = useGetInvoices();
    const router = useRouter();
    const createInvoice = useCreateInvoice();

    function enrollNow() {
        if (!sessionData?.user) {
            signIn();
        } else {
            const foundInvoice = invoices?.invoices.find(ele => ele.course === params.id)
            if (foundInvoice) {
                alert("Du hast bereits den Kurs")
                redirect(`/dashboard/courses/${params.id}`)
            } else {
                createInvoice.mutate({ id: params.id });
            }
        }
    }


    useEffect(() => {
        if (createInvoice.status === "success") {
            redirect(`/dashboard/courses/${params.id}`)
        }
    }, [createInvoice.status, params])


    if (isLoading || loadingInvoices) {
        return <LoadingIndicator />
    }


    return <>
        <Header />
        <div className="flex justify-center items-center px-4 py-2">
            <div className="grid grid-cols-1 place-items-center content-center max-w-3xl gap-5">
                <div className="bg-strongYellow grid grid-cols-1 p-12 gap-4 w-full">
                    <Headline variant="h1">
                        {data?.course.title}
                    </Headline>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <p className="font-bold">Description</p>
                    <p>{data?.course.description}</p>
                </div>
                <div className="w-full">
                    <Accordion type="multiple" className="w-full">
                        {data?.modules.map((module, index) => {
                            // eslint-disable-next-line react/jsx-key
                            return <AccordionItem className="" value={"item-1" + index}>
                                <AccordionTrigger className="bg-[#FFDEA7] px-4">
                                    <div className="flex flex-row items-center gap-3">
                                        <div className="w-10 h-10 p-2 rounded-full bg-black text-white">{index + 1}</div>
                                        {module.title}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent >
                                    <ul className="list-disc list-inside flex flex-col gap-4 py-5 pl-10">
                                        {module.lessons.map((lesson, index) => {
                                            return <li key={index} className="flex flex-row items-center justify-between">
                                                {lesson.title}
                                                {/* <Video /> */}
                                            </li>
                                        })}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        })}
                    </Accordion>
                </div>
                <Button onClick={enrollNow}>Enroll now</Button>
            </div>
        </div>
    </>
}

export default SingleCourseSell;