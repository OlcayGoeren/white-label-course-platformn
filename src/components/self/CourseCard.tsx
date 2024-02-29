import { FC } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export interface CourseCardProps {
    title: string;
    description: string;
    image: string;
}

const CourseCard: FC<CourseCardProps> = ({ description, image, title }) => {
    return <Card className="">
        <CardHeader>
            {/* https://placehold.co/150x100 */}
            <img src={image} alt="placeholder" />
            <CardTitle >{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
            <Button className="w-full">Jetzt Ansehen</Button>
        </CardFooter>
    </Card>
}

export default CourseCard;