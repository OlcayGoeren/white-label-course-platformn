
import { ZodType, z } from "zod";


export const OrganizationSchema = z.object({
    id: z.string(),
    telephone: z.string(),
    domain: z.string(),
    iban: z.string(),
    accountOwner: z.string(),
});

export type OrganizationSchemaType = z.infer<typeof OrganizationSchema>;
