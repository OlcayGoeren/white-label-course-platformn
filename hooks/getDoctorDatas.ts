import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ApiResponse {
  data: {
    response: {
      success: boolean;
      message: string;
      code: number;
    };
    doctor: Doctor;
  };
}

interface Doctor {
  timezone: string | null;
  specialty: string;
  salesforceId: string;
  portalAccsess: boolean;
  phone: string;
  openAppoinments: AppointmentDoctor[];
  myAppoinments: AppointmentDoctor[];
  location: string | null;
  lastname: string;
  firstname: string;
  email: string;
  birthdate: string | null;
}

export interface AppointmentDoctor {
  symptoms: string;
  status: "Scheduled" | "Rescheduling" | "Successful" | "Pending";
  scheduledDatetimeto: string | null;
  salesforceId: string;
  requestedDatetimeto: string;
  requestedDatetimefrom: string;
  paymentresponse: string | null;
  patient: Patient | null;
  merchantReference: string;
  meetingLink: string | null;
  durationInMinutesPlanned: number;
  durationInMinutesLasted: number | null;
  doctor: string | null;
}

interface Patient {
  email: string,
  weight: string | null;
  verificationCode: string | null;
  treatments: string | null;
  timeZone: string | null;
  symptoms: string | null;
  stresslevel: string | null;
  salesforceId: string;
  region: string | null;
  privateIssues: string | null;
  preferedPaymentMethods: string | null;
  phone: string | null;
  nutritionHabits: string | null;
  numberOfChildren: number | null;
  maritalStatus: string | null;
  lastname: string;
  insuranceNumber: string | null;
  firstname: string;
  drugs: string | null;
  countryCode: string | null;
  birthdate: string | null;
  areaCode: string | null;
  appoinments: AppointmentDoctor[] | null;
  age: number | null;
}


export const QUERY_KEY = ["doctor-dashboard"]

export const fetchDoctorData = async () => {
  const response = await axios.get("/api/doctorloader");
  return response.data;
}

export const usegetDoctorDatas = () => {
  return useQuery<ApiResponse, Error>({ queryKey: QUERY_KEY, queryFn: () => fetchDoctorData() });
};