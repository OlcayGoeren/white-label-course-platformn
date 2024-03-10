import { CourseSchema } from "@/types/courses";
import { InvoiceSchemaType } from "@/types/invoice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const GET_INVOICES = ["GET_INVOICES"]

export const getInvoices = async () => {
  const response = await axios.get("/api/invoice");
  return response.data;
}

export const useGetInvoices = () => {
  return useQuery<{
    invoices: InvoiceSchemaType[],
  }, Error>({ queryKey: GET_INVOICES, queryFn: () => getInvoices() });
};