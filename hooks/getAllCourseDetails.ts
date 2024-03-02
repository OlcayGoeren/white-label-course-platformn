import { CourseSchema } from "@/types/courses";
import { ModuleWithAllRelations } from "@/types/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const GET_ALL_COURSE_DETAILS_KEY = ["GET_ALL_COURSE_DETAILS_KEY"]

export const getAllCourseDetails = async (courseId: string) => {
  const response = await axios.get("/api/course/" + courseId);
  return response.data;
}

export const useGetAllCourseDetails = (courseId: string) => {
  return useQuery<{
    modulesWithRelations: ModuleWithAllRelations[]
  }, Error>({ queryKey: GET_ALL_COURSE_DETAILS_KEY, queryFn: () => getAllCourseDetails(courseId) });
};