import { CourseSchema } from "@/types/courses";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const GET_ACTIVE_COURSES_BY_ORGA = ["GET_ACTIVE_COURSES_BY_ORGA"]

const fetchCourses = async () => {
  const response = await axios.get("/api/courseorganization");
  return response.data;
}

export const useGetActiveCoursesByOrga = () => {
  return useQuery<{
    courses: CourseSchema[]
  }, Error>({ queryKey: GET_ACTIVE_COURSES_BY_ORGA, queryFn: () => fetchCourses() });
};