import { CourseContentchema } from "@/types/courseContent";;
import { Lessonchema } from "@/types/lessons";
import { OrganizationSchemaType } from "@/types/organization";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const GETORGANIZATION = ["GETORGANIZATION"]

export const getOrganization = async () => {
    const response = await axios.get("/api/organization");
    return response.data;
}

export const useGetOrganization = () => {
    return useQuery<{
        organization:
        OrganizationSchemaType
    }
        , Error>({
            queryKey: GETORGANIZATION, queryFn: () => getOrganization()
        });
};