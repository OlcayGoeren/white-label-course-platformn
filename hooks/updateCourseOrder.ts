import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ModuleSchemaForm } from '@/types/modules';
import { GET_ALL_COURSE_DETAILS_KEY } from './getAllCourseDetails';
// import schema


interface ResponseData {
    // define the structure of your response data here
}

export interface UpdateCourseOrder {
    courseId: string;
    modules: {
        id: string;
        order: number;
        organization: string;
    }[],
    lessons: {
        id: string;
        order: number;
        organization: string;
        module:string;
    }[]
}

export const UPDATE_COURSE_ORDER = ['UPDATE_COURSE_ORDER'];

export const updateCourseOrder = async (body: UpdateCourseOrder): Promise<ResponseData> => {
    try {
        const response = await axios.put("/api/course", body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useUpdateCourseOrder = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, UpdateCourseOrder>(
        {
            mutationFn: updateCourseOrder,
            mutationKey: UPDATE_COURSE_ORDER,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: GET_ALL_COURSE_DETAILS_KEY })
            }
        }
    );
};