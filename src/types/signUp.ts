import { ZodType, z } from "zod";

export interface SignUpFormData {
    email: string;
    password: string;
    forname: string;
    surname: string;
    birthDate: string;
    telephone: string;
    domain: string;
    iban: string;
    accountOwner: string;
    role?: "owner" | "admin" | "user";
}

export const SignUpFormDataSchema: ZodType<SignUpFormData> = z.object({
    email: z.string().email(),
    password: z.string().min(8), // Example: Password must be at least 8 characters long
    forname: z.string().min(1), // Ensuring the string is not empty
    surname: z.string().min(1), // Ensuring the string is not empty
    birthDate: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/), // Example: YYYY-MM-DD format
    telephone: z.string().min(10), // Example: Assuming a minimum length for phone numbers
    domain: z.string().url(), // Validates if the string is a valid URL
    iban: z.string().min(15), // Example: Basic validation for IBAN length
    accountOwner: z.string().min(1), // Ensuring the string is not empty
});