import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ModuleSchemaForm } from '@/types/modules';
import { GET_ALL_COURSE_DETAILS_KEY } from './getAllCourseDetails';
import { CourseContentSchemaForm, CourseContentZodSchemaUpdateVideo, CourseContentchema } from '@/types/courseContent';
// import schema


interface ResponseData {
    // define the structure of your response data here
}



export const UPDATE_COURSE_CONTENT_VIDEO = ['UPDATE_COURSE_CONTENT_VIDEO'];

export const updateCourseContentVideo = async (body: CourseContentZodSchemaUpdateVideo): Promise<ResponseData> => {
    try {
        const response = await axios.put("/api/courseContent", body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useUpdateCourseContentVideo = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, CourseContentZodSchemaUpdateVideo>(
        {
            mutationFn: updateCourseContentVideo,
            mutationKey: UPDATE_COURSE_CONTENT_VIDEO,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: GET_ALL_COURSE_DETAILS_KEY })
            }
        }
    );
};