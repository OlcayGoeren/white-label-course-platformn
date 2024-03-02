import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ModuleSchemaForm } from '@/types/modules';
import { GET_ALL_COURSE_DETAILS_KEY } from './getAllCourseDetails';
// import schema


interface ResponseData {
    // define the structure of your response data here
}



export const CREATE_MODULE = ['CREATE_MODULE'];

export const createModule = async (body: ModuleSchemaForm): Promise<ResponseData> => {
    try {
        const response = await axios.post("/api/module", body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useCreateModule = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, ModuleSchemaForm>(
        {
            mutationFn: createModule,
            mutationKey: CREATE_MODULE,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: GET_ALL_COURSE_DETAILS_KEY })
            }
        }
    );
};