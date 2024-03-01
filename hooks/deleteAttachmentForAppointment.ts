import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEY } from './getFilesForAppointment';



interface ResponseData {
    // define the structure of your response data here
}


export const MUTATION_KEY = ['uploadFilesForAppointment'];

export const deleteAttachmentForAppointment = async (fileId: string): Promise<ResponseData> => {
    try {
        const response = await axios.delete('/api/files/' + fileId)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useDeleteAttachmentForAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, string>(
        {
            mutationFn: deleteAttachmentForAppointment,
            mutationKey: MUTATION_KEY,
            onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: QUERY_KEY })
            }
        }
    );
};