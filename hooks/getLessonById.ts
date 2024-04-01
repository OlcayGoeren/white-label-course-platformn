import { CourseContentchema } from "@/types/courseContent";
import { CourseSchema } from "@/types/courses";
import { Lessonchema } from "@/types/lessons";
import { ModuleWithAllRelations } from "@/types/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const GET_LESSON_BY_ID = ["GET_LESSON_BY_ID"]

export const getLessonById = async (lessonId: string) => {
  const response = await axios.get("/api/lesson/" + lessonId);
  return response.data;
}

export const useGetLessonById = (lessonId: string) => {
  return useQuery<{
    lesson: Lessonchema,
    courseContent: CourseContentchema,
  }, Error>({
    queryKey: GET_LESSON_BY_ID, queryFn: () => getLessonById(lessonId), staleTime: 0
  });
};