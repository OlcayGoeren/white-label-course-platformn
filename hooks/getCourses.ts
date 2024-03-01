import { CourseSchema } from "@/types/courses";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const QUERY_KEY = ["GET_COURSES"]

export const fetchCourses = async () => {
  const response = await axios.get("/api/course");
  return response.data;
}

export const useGetCourses = () => {
  return useQuery<{
    courses: CourseSchema[]
  }, Error>({ queryKey: QUERY_KEY, queryFn: () => fetchCourses() });
};