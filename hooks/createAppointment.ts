import { APSResponse } from '@/types/types';
import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEY } from './getPatientData';



export interface RequestBodyCreateAppointment {
    paymentResponse: APSResponse, 
    symptoms: string,
    datetimefrom: string,
    datetimeto: string,
    email: string
}

interface ResponseData {
    // define the structure of your response data here
}


export const MUTATION_KEY = ['createAppointments'];

export const createAppointment = async (body: RequestBodyCreateAppointment): Promise<ResponseData> => {
    try {
        const response = await axios.post("/api/payfort/end", body);
        return response.data;
    } catch (error) {
        // handle or throw the error appropriately
        throw error;
    }
};

export const useCreateAppointment = (queryClient: QueryClient) => {
    return useMutation<ResponseData, Error, RequestBodyCreateAppointment>(
        {
            mutationFn: createAppointment,
            mutationKey: MUTATION_KEY,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: QUERY_KEY })
            }


        }
    );
};
