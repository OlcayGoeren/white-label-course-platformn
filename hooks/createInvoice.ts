import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { course } from '../db/schema';
import { CourseSchemaForm } from '@/types/courses';
import { GET_COURSES_KEY } from './getCourses';
import { LessonSchemaForm } from '@/types/lessons';
import { GET_ALL_COURSE_DETAILS_KEY } from './getAllCourseDetails';
import { BuyInvoiceSchemaType } from '@/types/invoice';
// import schema


interface ResponseData {
    // define the structure of your response data here
}

export const CREATE_INVOICE = ['CREATE_INVOICE'];

export const createInvoice = async (body: BuyInvoiceSchemaType): Promise<ResponseData> => {
    try {
        const response = await axios.post("/api/invoice", body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useCreateInvoice = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseData, Error, BuyInvoiceSchemaType>(
        {
            mutationFn: createInvoice,
            mutationKey: CREATE_INVOICE,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: GET_ALL_COURSE_DETAILS_KEY })
            }
        }
    );
};
