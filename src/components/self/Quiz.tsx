import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { InputLabelDecoupled } from "./InputLabel";
import { Button } from "../ui/button";
import { LessonWithAllRelations } from "@/types/lessons";
import { Quiz, quizConfigSchema } from "@/types/courseContent";
import { useCreateCourseContent } from "../../../hooks/createCourseContent";
import LoadingIndicator from "./LoadingIndicator";



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



const QuizWrapper: FC<{ foundLesson: LessonWithAllRelations, customUpdate?: (quizzes: Quiz[]) => void }> = ({ foundLesson, customUpdate }) => {
    const [loader, setLoader] = useState(false);
    const createCourseContent = useCreateCourseContent();
    const [quizzes, setQuizzes] = useState<Quiz[]>([initQuest])
    useEffect(() => {
        try {
            const parsedData = quizConfigSchema.safeParse(foundLesson.courseContents[0].lectureConfig)
            setQuizzes(parsedData.success ? parsedData.data.quizzes : [initQuest])
        } catch (error) {
        }
    }, [])

    function addQuestion() {
        setQuizzes(old => [...old, initQuest])
    }

    function save() {
        if (customUpdate) {
            customUpdate(quizzes)
        } else {
            setLoader(true)
            createCourseContent.mutate({
                lesson: foundLesson.id,
                lectureType: "quiz",
                lectureConfig: { quizzes }
            })
        }
    }

    function removeIdex(index: number) {
        setQuizzes(old => {
            const newQuizzes = [...old];
            newQuizzes.splice(index, 1);
            return newQuizzes
        })
    }

    return <>
        {loader && <LoadingIndicator />}
        {quizzes.map((ele, index) => {
            return <Quiz key={index} removeIdex={removeIdex} parentQuiz={ele} idx={index} setQuizzes={setQuizzes} />
        })
        }
        <div className="space-x-2">
            <Button onClick={addQuestion}>Frage hinzufügen</Button>
            <Button onClick={save}>Speichern</Button>
        </div>
    </>
}

const Quiz: FC<{
    parentQuiz: Quiz,
    setQuizzes: Dispatch<SetStateAction<Quiz[]>>,
    idx: number,
    removeIdex: (index: number) => void
}> = ({ setQuizzes, idx, parentQuiz, removeIdex }) => {
    const [quiz, setQuiz] = useState<Quiz>(parentQuiz)
    const [bla, setBla] = useState(false);

    useEffect(() => {
        bla &&
            setQuizzes(old => {
                const newQuizzes = [...old];
                newQuizzes[idx] = quiz;
                return newQuizzes;
            })
    }, [quiz])

    function onChange(e: React.ChangeEvent<HTMLInputElement>, property: keyof Quiz) {
        const { value, checked } = e.target;
        setQuiz(old => ({ ...old, [property]: value === "on" ? checked : value }))
    }

    useEffect(() => {
        setQuiz(parentQuiz);
        setBla(true)
    }, [parentQuiz]);

    return <>
        <div className="border-2 border-lightGray rounded-md flex flex-col w-full p-7 gap-3">
            <Button onClick={() => removeIdex(idx)} className="w-fit self-end" variant={"destructive"}>
                Entfernen
            </Button>
            <div className="flex flex-row" >
                <InputLabelDecoupled value={quiz.question} onChange={(e) => onChange(e, "question")} id="qestion" label="Frage" type="text" />
            </div>

            <div className="flex flex-row gap-3 items-center">
                <input checked={quiz.correctAnswer1} onChange={(e) => onChange(e, "correctAnswer1")} type="checkbox" className="h-6 w-6" />
                <InputLabelDecoupled value={quiz.answer1} onChange={(e) => onChange(e, "answer1")} id="answer1" label="Antwort" type="text" />
            </div>


            <div className="flex flex-row gap-3 items-center">
                <input checked={quiz.correctAnswer2} type="checkbox" className="h-6 w-6" onChange={(e) => onChange(e, "correctAnswer2")} />
                <InputLabelDecoupled value={quiz.answer2} onChange={(e) => onChange(e, "answer2")} id="answer2" label="Antwort" type="text" />
            </div>


            <div className="flex flex-row gap-3 items-center">
                <input checked={quiz.correctAnswer3} type="checkbox" className="h-6 w-6" onChange={(e) => onChange(e, "correctAnswer3")} />
                <InputLabelDecoupled value={quiz.answer3} onChange={(e) => onChange(e, "answer3")} id="answer3" label="Antwort" type="text" />
            </div>

            <div className="flex flex-row gap-3 items-center">
                <input checked={quiz.correctAnswer4} type="checkbox" className="h-6 w-6" onChange={(e) => onChange(e, "correctAnswer4")} />
                <InputLabelDecoupled value={quiz.answer4} onChange={(e) => onChange(e, "answer4")} id="answer4" label="Antwort" type="text" />
            </div>
        </div>
    </>
}

export default QuizWrapper;
