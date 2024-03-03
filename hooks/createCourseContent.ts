import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ModuleSchemaForm } from '@/types/modules';
import { GET_ALL_COURSE_DETAILS_KEY } from './getAllCourseDetails';
import { CourseContentSchemaForm } from '@/types/courseContent';
// import schema


interface ResponseData {
    // define the structure of your response data here
}



export const CREATE_COURSE_CONTENT = ['CREATE_COURSE_CONTENT'];

export const createCourseContent = async (body: CourseContentSchemaForm): Promise<ResponseData> => {
    try {
        const response = await axios.post("/api/courseContent", body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useCreateCourseContent = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, CourseContentSchemaForm>(
        {
            mutationFn: createCourseContent,
            mutationKey: CREATE_COURSE_CONTENT,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: GET_ALL_COURSE_DETAILS_KEY })
            }
        }
    );
};