import { FieldValues } from "react-hook-form";
import { ZodType, z } from "zod";



export const InvoiceSchema = z.object({
    id: z.string(),
    amount: z.string(), // Example: Password must be at least 8 characters long
    date: z.string(), // Example: YYYY-MM-DD format,
    user: z.string(),
    course: z.string(),
    organization: z.string(),
});

export type InvoiceSchemaType = z.infer<typeof InvoiceSchema>;

export const BuyInvoiceSchema = z.object({
    id: z.string(),
});

export type BuyInvoiceSchemaType = z.infer<typeof BuyInvoiceSchema>;
