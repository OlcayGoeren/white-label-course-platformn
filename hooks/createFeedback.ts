import { useMutation } from '@tanstack/react-query';
import axios from 'axios';



interface ResponseData {
    // define the structure of your response data here
}

export interface CreateFeedbackRequest {
    adherenceToSchedule: number,
    competence: number,
    ooliteness: number,
    userFriendlyAppUsage: number,
    videoAndAudioQuality: number,
    review: string,
    merchantReference: string,
    email?: string
}


export const MUTATION_KEY = ['create_feedback'];

export const createFeedback = async (body: CreateFeedbackRequest): Promise<ResponseData> => {
    try {
        const response = await axios.post('/api/appointment/feedback', body)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useCreateFeedback = () => {
    return useMutation<ResponseData, Error, CreateFeedbackRequest>(
        {
            mutationFn: createFeedback,
            mutationKey: MUTATION_KEY,
        }
    );
};