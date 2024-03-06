import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GET_ALL_COURSE_DETAILS_KEY } from './getAllCourseDetails';


interface ResponseData {
    // define the structure of your response data here
}


interface DifferentType {
    id: string;
}

export const LESSON_DELETE = ['LESSON_DELETE'];

export const deleteLesson = async (req: DifferentType): Promise<ResponseData> => {
    try {
        const response = await axios.delete("/api/lesson/" + req.id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useDeleteLesson = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, DifferentType>(
        {
            mutationFn: deleteLesson,
            mutationKey: LESSON_DELETE,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: GET_ALL_COURSE_DETAILS_KEY })
            }
        }
    );
};