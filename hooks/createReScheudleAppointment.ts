import { APSResponse, RescheudleAppointmentRequest } from '@/types/types';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEY } from './getPatientData';




interface ResponseData {
    // define the structure of your response data here
}


export const MUTATION_KEY = ['rescheudle_appointment'];

export const createReScheudleAppointment = async (body: RescheudleAppointmentRequest): Promise<ResponseData> => {
    try {
        const response = await axios.post("/api/appointment/rescheudle", body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useCreateReScheudleAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, RescheudleAppointmentRequest>(
        {
            mutationFn: createReScheudleAppointment,
            mutationKey: MUTATION_KEY,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: QUERY_KEY })
            }
        }
    );
};