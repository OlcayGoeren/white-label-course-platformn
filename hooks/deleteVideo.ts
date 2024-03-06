import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GET_ALL_COURSE_DETAILS_KEY } from './getAllCourseDetails';


interface ResponseData {
    // define the structure of your response data here
}


interface DifferentType {
    videoId: string;
}

export const DELETE_VIDEO = ['DELETE_VIDEO'];

export const deleteVideo = async (req: DifferentType): Promise<ResponseData> => {
    try {
        const response = await axios.delete("/api/bunny/video/" + req.videoId);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useDeleteVideo = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, DifferentType>(
        {
            mutationFn: deleteVideo,
            mutationKey: DELETE_VIDEO,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: GET_ALL_COURSE_DETAILS_KEY })
            }
        }
    );
};