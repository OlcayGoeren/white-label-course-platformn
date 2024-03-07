import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { InputLabelDecoupled } from "./InputLabel";
import { Button } from "../ui/button";
import { LessonWithAllRelations } from "@/types/lessons";
import { Quiz } from "@/types/courseContent";
import { useCreateCourseContent } from "../../../hooks/createCourseContent";
import { set } from "lodash";



const initQuest: Quiz = {
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctAnswer1: false,
    correctAnswer2: false,
    correctAnswer3: false,
    correctAnswer4: false,
    question: ""
}



const QuizWrapper: FC<{ foundLesson: LessonWithAllRelations }> = ({ foundLesson }) => {
    const createCourseContent = useCreateCourseContent();
    const [quizzes, setQuizzes] = useState<Quiz[]>([initQuest])

    function addQuestion() {
        setQuizzes(old => [...old, initQuest])
    }

    function save() {
        createCourseContent.mutate({
            lesson: foundLesson.id,
            lectureType: "quiz",
            lectureConfig: { quizzes }
        })
    }

    const updateQuizAtIndex = (updatedQuiz: Quiz, index: number) => {
        setQuizzes(quizzes => quizzes.map((quiz, i) => i === index ? updatedQuiz : quiz));
    };

    return <>
        {quizzes.map((quiz, index) => {
            return <Quiz idx={index} setQuizzes={setQuizzes} />
        })
        }
        <div className="space-x-2">
            <Button onClick={addQuestion}>Frage hinzufügen</Button>
            <Button onClick={save}>Speichern</Button>
        </div>
    </>
}

const Quiz: FC<{
    setQuizzes: Dispatch<SetStateAction<Quiz[]>>,
    idx: number
}> = ({ setQuizzes, idx }) => {
    const [quiz, setQuiz] = useState<Quiz>(initQuest)


    function onChange(e: React.ChangeEvent<HTMLInputElement>, property: keyof Quiz) {
        const { value, checked } = e.target;
        setQuiz(old => ({ ...old, [property]: value === "on" ? checked : value }))
    }

    useEffect(() => {
        setQuizzes(old => {
            const newQuizzes = [...old];
            newQuizzes[idx] = quiz;
            return newQuizzes;
        })
    }, [quiz])




    return <>
        <div className="border-2 border-lightGray rounded-md flex flex-col w-full p-7 gap-3">
            <div className="flex flex-row" >
                <InputLabelDecoupled value={quiz.question} onChange={(e) => onChange(e, "question")} id="qestion" label="Frage" type="text" />
            </div>

            <div className="flex flex-row gap-3 items-center">
                <input onChange={(e) => onChange(e, "correctAnswer1")} type="checkbox" className="h-6 w-6" />
                <InputLabelDecoupled value={quiz.answer1} onChange={(e) => onChange(e, "answer1")} id="answer1" label="Antwort" type="text" />
            </div>


            <div className="flex flex-row gap-3 items-center">
                <input type="checkbox" className="h-6 w-6" onChange={(e) => onChange(e, "correctAnswer2")} />
                <InputLabelDecoupled value={quiz.answer2} onChange={(e) => onChange(e, "answer2")} id="answer2" label="Antwort" type="text" />
            </div>


            <div className="flex flex-row gap-3 items-center">
                <input type="checkbox" className="h-6 w-6" onChange={(e) => onChange(e, "correctAnswer3")} />
                <InputLabelDecoupled value={quiz.answer3} onChange={(e) => onChange(e, "answer3")} id="answer3" label="Antwort" type="text" />
            </div>

            <div className="flex flex-row gap-3 items-center">
                <input type="checkbox" className="h-6 w-6" onChange={(e) => onChange(e, "correctAnswer4")} />
                <InputLabelDecoupled value={quiz.answer4} onChange={(e) => onChange(e, "answer4")} id="answer4" label="Antwort" type="text" />
            </div>
        </div>
    </>
}

export default QuizWrapper;
