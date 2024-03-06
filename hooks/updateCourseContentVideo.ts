import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ModuleSchemaForm } from '@/types/modules';
import { GET_ALL_COURSE_DETAILS_KEY } from './getAllCourseDetails';
import { CourseContentSchemaForm, CourseContentZodSchemaUpdate, CourseContentchema } from '@/types/courseContent';
// import schema


interface ResponseData {
    // define the structure of your response data here
}



export const UPDATE_COURSE_CONTENT = ['UPDATE_COURSE_CONTENT'];

export const updateCourseContent = async (body: CourseContentZodSchemaUpdate): Promise<ResponseData> => {
    try {
        const response = await axios.put("/api/courseContent", body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useUpdateCourseContent = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, CourseContentZodSchemaUpdate>(
        {
            mutationFn: updateCourseContent,
            mutationKey: UPDATE_COURSE_CONTENT,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: GET_ALL_COURSE_DETAILS_KEY })
            }
        }
    );
};