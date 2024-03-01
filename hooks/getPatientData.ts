import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Response {
    success: boolean;
    message: string;
    code: number;
}

interface Doctor {
    salesforceId: string;
    lastName: string;
    firstName: string;
}

export interface Appointment {
    symptoms: string | null;
    status: "Scheduled" | "Rescheduling" | "Successful" | "Pending";
    scheduledDatetimeto: string | null;
    salesforceId: string;
    requestedDatetimeto: string;
    requestedDatetimefrom: string;
    paymentresponse: any | null;
    merchantReference: string;
    meetingLink: string | null;
    durationInMinutesPlanned: number;
    durationInMinutesLasted: number | null;
    doctor: Doctor | null;
}

interface Patient {
    weight: any | null;
    verificationCode: any | null;
    treatments: any | null;
    timeZone: any | null;
    symptoms: any | null;
    stresslevel: any | null;
    salesforceId: string;
    region: any | null;
    privateIssues: any | null;
    preferedPaymentMethods: any | null;
    phone: string;
    nutritionHabits: any | null;
    numberOfChildren: any | null;
    maritalStatus: any | null;
    lastname: string;
    insuranceNumber: any | null;
    firstname: string;
    drugs: any | null;
    countryCode: string;
    birthdate: string;
    areaCode: string;
    appoinments: Appointment[];
    age: number;
    email: string
}

interface DataStructure {
    response: Response;
    patient: Patient;
}

export const QUERY_KEY = ['patientData'];

export const fetchPatientData = async () => {
    const response = await axios.get("/api/userData");
    return response.data.data;
}

export const useGetPatient = () => {
    return useQuery<DataStructure, Error>({ retry: 2, queryKey: QUERY_KEY, queryFn: () => fetchPatientData() });
};