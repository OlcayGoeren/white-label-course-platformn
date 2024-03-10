import { CourseSchema, CourseWithEnrollmentsZodSchemaType } from "@/types/courses";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const GET_COURSES_KEY = ["GET_COURSES"]

export const fetchCoursesWithEnrollments = async () => {
  const response = await axios.get("/api/coursesWithInvoices");
  return response.data;
}

export const useFetchCoursesWithEnrollments = () => {
  return useQuery<{
    courses: CourseWithEnrollmentsZodSchemaType[]
  }, Error>({ queryKey: GET_COURSES_KEY, queryFn: () => fetchCoursesWithEnrollments() });
};