import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GET_ALL_COURSE_DETAILS_KEY } from './getAllCourseDetails';


interface ResponseData {
    // define the structure of your response data here
}


interface DifferentType {
    moduleId: string;
}

export const DELETE_MODULE = ['DELETE_MODULE'];

export const deleteModule = async (req: DifferentType): Promise<ResponseData> => {
    try {
        const response = await axios.delete("/api/module/" + req.moduleId);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useDeleteModule = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, DifferentType>(
        {
            mutationFn: deleteModule,
            mutationKey: DELETE_MODULE,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: GET_ALL_COURSE_DETAILS_KEY })
            }
        }
    );
};