import { FieldValues } from "react-hook-form";
import { ZodType, z } from "zod";


export const SignInFormDataSchema: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(4), // Example: Password must be at least 8 characters long
    domain: z.string()
});

export type SignInFormDataSchema = z.infer<typeof SignInFormDataSchema>;



export const SignUpFormDataSchema: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(4), // Example: Password must be at least 8 characters long
    domain: z.string()
});
