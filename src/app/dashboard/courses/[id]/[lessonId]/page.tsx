"use client"
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import { useGetLessonById } from "../../../../../../hooks/getLessonById";
import Headline from "@/components/self/Headline";
import { CourseContentchema, quizConfigSchema, videoConfigSchema } from "@/types/courseContent";
import { Button } from "@/components/ui/button";
import LoadingIndicator from "@/components/self/LoadingIndicator";


const DashboardLessonPage: FC = () => {
    const params = useParams<{ id: string, lessonId: string }>();

    const { data: lessonData, isLoading } = useGetLessonById(params.lessonId);
    const [result, setResult] = useState<string | undefined>()



    function checkQuiz() {
        // get all inputs
        const inputs = document.querySelectorAll("input");
        const answers: string[] = [];
        inputs.forEach((input) => {
            if (input.checked) {
                answers.push(input.id);
            }
        });


        // validate answers
        let correctAnswers = 0;
        const quizConfig = quizConfigSchema.parse(lessonData?.courseContent.lectureConfig);
        const { quizzes } = quizConfig;

        quizzes.forEach((quiz, index) => {
            const filteredIndexes = answers.filter((answer) => answer.split(":")[0] === index.toString());
            const rightAnswers = [quiz.correctAnswer1, quiz.correctAnswer2, quiz.correctAnswer3, quiz.correctAnswer4];


            if (quiz.correctAnswer1) {
                if (!(filteredIndexes.includes(index + ":a1"))) {
                    return;
                }
            } else {
                if ((filteredIndexes.includes(index + ":a1"))) {
                    return;
                }
            }

            if (quiz.correctAnswer2) {
                if (!(filteredIndexes.includes(index + ":a2"))) {
                    return;
                }
            } else {
                if ((filteredIndexes.includes(index + ":a2"))) {
                    return;
                }
            }

            if (quiz.correctAnswer3) {
                if (!(filteredIndexes.includes(index + ":a3"))) {
                    return;
                }
            } else {
                if ((filteredIndexes.includes(index + ":a3"))) {
                    return;
                }
            }

            if (quiz.correctAnswer4) {
                if (!(filteredIndexes.includes(index + ":a4"))) {
                    return;
                }
            } else {
                if ((filteredIndexes.includes(index + ":a4"))) {
                    return;
                }
            }

            correctAnswers++;
        })

        setResult(correctAnswers + "/" + quizzes.length);
    }

    function renderLearnContent(courseContent: CourseContentchema) {
        switch (courseContent.lectureType) {
            case "video":
                const videoConfig = videoConfigSchema.parse(courseContent.lectureConfig);
                return (
                    <div className="flex flex-col">
                        <div className="md:w-[35em] md:h-[20em]">
                            <iframe className="w-full h-full" allowFullScreen src={`https://iframe.mediadelivery.net/embed/140551/${(videoConfig.id)}?autoplay=false&loop=false&muted=false&preload=false`} />
                        </div>
                        <div className="
                        ">
                            <div dangerouslySetInnerHTML={{ __html: videoConfig.richText! }} />
                        </div>
                    </div>
                )
            case "quiz":
                const quizConfig = quizConfigSchema.parse(courseContent.lectureConfig);
                return (
                    <div className="grid grid-cols-1 md:w-[33vw]">
                        {quizConfig.quizzes.map((quiz, index) => {
                            return <div key={index} className="py-4">
                                <div className="grid grid-cols-1 gap-2 border-2 border-black p-3 rounded-lg">
                                    <div className="border-2 rounded-lg p-3 mb-5">
                                        <p>{quiz.question}</p>
                                    </div>
                                    <div className="flex flex-row justify-between border-2 rounded-lg p-3">
                                        <p>{quiz.answer1}</p>
                                        <input id={index + ":" + "a1"} className="" type="checkbox" />
                                    </div>
                                    <div className="flex flex-row justify-between border-2 rounded-lg p-3">
                                        <p>{quiz.answer2}</p>
                                        <input id={index + ":" + "a2"} className="" type="checkbox" />
                                    </div>
                                    <div className="flex flex-row justify-between border-2 rounded-lg p-3">
                                        <p>{quiz.answer3}</p>
                                        <input id={index + ":" + "a3"} className="" type="checkbox" />
                                    </div>
                                    <div className="flex flex-row justify-between border-2 rounded-lg p-3">
                                        <p>{quiz.answer4}</p>
                                        <input id={index + ":" + "a4"} className="" type="checkbox" />
                                    </div>
                                </div>
                            </div>
                        })}
                        <Button onClick={checkQuiz}>Ergebnis</Button>
                    </div>
                )
            default:
                return null;
        }

    }

    if (isLoading && lessonData === undefined) {
        return <LoadingIndicator />
    }




    return (
        <div>
            <Headline variant="h2">
                <>{lessonData?.lesson.title}</>
            </Headline>
            <Headline variant="sub">
                <>{lessonData?.lesson.description}</>
            </Headline>

            <main>
                {
                    result ? <>
                        <div className="flex flex-col gap-2">
                            <p className="p-2 rounded-lg border-2 border-black w-fit">{result}</p>
                            <Button className="w-fit" onClick={() => setResult(undefined)}>Nochmal</Button>
                        </div>
                    </> : renderLearnContent(lessonData!.courseContent)
                }
            </main>

        </div>
    );
}

export default DashboardLessonPage;