import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type SignatureResponse = {
    success: boolean,
    signature: string
}

export const QUERY_KEY = ["generateSignature"]

export const fetchSignature = async (merchantId: string) => {
    const response = await axios.get("/api/generateSignature/" + merchantId);
    return response.data;
}

export const useGetSignature = (merchantId: string) => {
    return useQuery<SignatureResponse, Error>({ queryKey: [...QUERY_KEY, merchantId], queryFn: () => fetchSignature(merchantId) });
};