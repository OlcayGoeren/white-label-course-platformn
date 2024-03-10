import { CourseSchema, CourseWithEnrollmentsZodSchemaType } from "@/types/courses";
import { FC } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


const CourseTile: FC<{ course: CourseWithEnrollmentsZodSchemaType }> = ({ course }) => {
    const router = useRouter();

    return <Card>
        <CardHeader>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
        </CardHeader>
        <CardFooter>
            {course.enrolled ? <Button onClick={() => router.push("/dashboard/courses/" + course.id)}>Starten</Button> :
                <Button onClick={() => router.push("/courses/" + course.id)}>Kurs ansehen</Button>
            }
        </CardFooter>
    </Card>
}

export default CourseTile