// createUploadFilesForAppointment

import { APSResponse, AcceptAppointmentRequest, UpdateSymtomsAppointmentRequest } from '@/types/types';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEY } from './getFilesForAppointment';



interface ResponseData {
    // define the structure of your response data here
}


export const MUTATION_KEY = ['uploadFilesForAppointment'];

export const createUploadFilesForAppointment = async (body: FormData): Promise<ResponseData> => {
    try {
        const response = await axios.post('/api/upload', body)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useCreateUploadFilesForAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, FormData>(
        {
            mutationFn: createUploadFilesForAppointment,
            mutationKey: MUTATION_KEY,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: QUERY_KEY })
            }
        }
    );
};