import { APSResponse, AcceptAppointmentRequest, UpdateSymtomsAppointmentRequest } from '@/types/types';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEY } from './getPatientData';



interface ResponseData {
    // define the structure of your response data here
}


export const MUTATION_KEY = ['update_symptoms_appontments'];

export const createUpdateSymtoms = async (body: UpdateSymtomsAppointmentRequest): Promise<ResponseData> => {
    try {
        const response = await axios.put("/api/appointment", body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useCreateUpdateSymtoms = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, UpdateSymtomsAppointmentRequest>(
        {
            mutationFn: createUpdateSymtoms,
            mutationKey: MUTATION_KEY,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: QUERY_KEY })
            }
        }
    );
};