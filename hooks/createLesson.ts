import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { course } from '../db/schema';
import { CourseSchemaForm } from '@/types/courses';
import { GET_COURSES_KEY } from './getCourses';
import { LessonSchemaForm } from '@/types/lessons';
import { GET_ALL_COURSE_DETAILS_KEY } from './getAllCourseDetails';
// import schema


interface ResponseData {
    // define the structure of your response data here
}

export const CREATE_LESSON = ['CREATE_LESSON'];

export const createLesson = async (body: LessonSchemaForm): Promise<ResponseData> => {
    try {
        const response = await axios.post("/api/lesson", body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useCreateLesson = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, LessonSchemaForm>(
        {
            mutationFn: createLesson,
            mutationKey: CREATE_LESSON,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: GET_ALL_COURSE_DETAILS_KEY })
            }
        }
    );
};