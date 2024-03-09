import { FieldValues } from "react-hook-form";
import { ZodType, z } from "zod";


export const SignUpFormDataSchemaUser: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(4), // Example: Password must be at least 8 characters long
    domain: z.string(),
    forname: z.string(),
    surname: z.string(),
    birthdate: z.string(),
});

export type SignUpFormDataSchemaUserType = z.infer<typeof SignUpFormDataSchemaUser>;

