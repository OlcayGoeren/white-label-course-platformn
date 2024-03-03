import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEY } from './getFilesForAppointment';

type Caption = {
    srclang: string;
    label: string;
}

interface Chapter {
    title: string;
    start?: string;
    end?: string;
}

type Moment = {
    label: string;
    timestamp: number;
}

type MetaTag = {
    property: string;
    value: string;
}

type TranscodingMessage = {
    timeStamp: string;
    level: number;
    issueCode: number;
    message: string;
    value: string;
}

export interface VideoItem {
    videoLibraryId: number;
    guid: string;
    title: string;
    dateUploaded: string;
    views: number;
    isPublic: boolean;
    length: number;
    status: number;
    framerate: number;
    width: number;
    height: number;
    availableResolutions: string;
    thumbnailCount: number;
    encodeProgress: number;
    storageSize: number;
    captions: Caption[];
    hasMP4Fallback: boolean;
    collectionId: string;
    thumbnailFileName: string;
    averageWatchTime: number;
    totalWatchTime: number;
    category: string;
    chapters: Chapter[];
    moments: Moment[];
    metaTags: MetaTag[];
    transcodingMessages: TranscodingMessage[];
}

export interface CreateVideoRequest {
    title: string
}

export const UPLOAD_VIDEO = ['UPLOAD_VIDEO'];

export const createVideo = async (body: CreateVideoRequest): Promise<VideoItem> => {
    try {
        const response = await axios.post('/api/bunny/video', body)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useCreateVideo = () => {
    const queryClient = useQueryClient();
    return useMutation<VideoItem, Error, CreateVideoRequest>(
        {
            mutationFn: createVideo,
            mutationKey: UPLOAD_VIDEO,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: QUERY_KEY })
            }
        }
    );
};