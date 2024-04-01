import { CourseSchema } from "@/types/courses";
import { ModuleWithAllRelations } from "@/types/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const GET_ALL_COURSE_DETAILS_PUBLIC_KEY = ["GET_ALL_COURSE_DETAILS_PUBLIC_KEY"]

export const getAllCourseDetailsPublic = async (courseId: string) => {
  const response = await axios.get("/api/coursePublic/" + courseId);
  return response.data;
}

export const useGetAllCourseDetailsPublic = (courseId: string) => {
  return useQuery<{
    modules: ModuleWithAllRelations[],
    course: CourseSchema
  }, Error>({ queryKey: GET_ALL_COURSE_DETAILS_PUBLIC_KEY, queryFn: () => getAllCourseDetailsPublic(courseId), staleTime: 0 });
};