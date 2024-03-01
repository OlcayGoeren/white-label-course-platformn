import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GetFilesForAppointmentResponse {
    ids: string[]
}


export const QUERY_KEY = ["list-files-for-Appointment"]

export const fetchListOfFilesForAppointments = async (appointmentId: string) => {
    const response = await axios.get("/api/files/" + appointmentId);
    return response.data;
}

export const useGetFilesForAppointment = (appointmentId: string) => {
    return useQuery<GetFilesForAppointmentResponse, Error>({ queryKey: QUERY_KEY, queryFn: () => fetchListOfFilesForAppointments(appointmentId) });
};