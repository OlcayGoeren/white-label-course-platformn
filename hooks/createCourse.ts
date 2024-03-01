import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { course } from '../db/schema';
import { CourseSchemaForm } from '@/types/courses';
import { GET_COURSES_KEY } from './getCourses';
// import schema


interface ResponseData {
    // define the structure of your response data here
}



export const MUTATION_KEY = ['create_course'];

export const createCourse = async (body: CourseSchemaForm): Promise<ResponseData> => {
    try {
        const response = await axios.post("/api/course", body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useCreateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, CourseSchemaForm>(
        {
            mutationFn: createCourse,
            mutationKey: MUTATION_KEY,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: GET_COURSES_KEY })
            }
        }
    );
};