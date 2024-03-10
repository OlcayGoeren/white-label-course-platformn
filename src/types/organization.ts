
import { ZodType, z } from "zod";


export const OrganizationSchema: ZodType = z.object({
    id: z.string(),
    companyName: z.string(),
});

export type OrganizationSchema = z.infer<typeof OrganizationSchema>;
