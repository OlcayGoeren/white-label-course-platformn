import { CourseSchema } from "@/types/courses";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const GET_COURSES_ORGANIZATION = ["GET_COURSES_ORGANIZATION"]

export const fetchCourses = async () => {
  const response = await axios.get("/api/course");
  return response.data;
}

export const useGetCourses = () => {
  return useQuery<{
    courses: CourseSchema[]
  }, Error>({ queryKey: GET_COURSES_ORGANIZATION, queryFn: () => fetchCourses() });
};