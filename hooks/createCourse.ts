import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEY } from './getDoctorDatas';
import { course } from '../db/schema';
// import schema


interface ResponseData {
    // define the structure of your response data here
}



export const MUTATION_KEY = ['accept_appontments'];

export const acceptAppointment = async (body: typeof course): Promise<ResponseData> => {
    try {
        // mach einfach mit parallelen types leider...
        // bau zod types...
        const response = await axios.post("/api/course", body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useAcceptAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, AcceptAppointmentRequest>(
        {
            mutationFn: acceptAppointment,
            mutationKey: MUTATION_KEY,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: QUERY_KEY })
            }
        }
    );
};