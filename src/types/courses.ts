import { ZodType, ZodTypeAny, z } from "zod";


export const CourseZodSchemaForm = z.object({
    title: z.string().min(4),
    description: z.string().optional(),
    status: z.enum(["active", "inactive"]).default("inactive"),
    price: z.number().nonnegative().optional(),
});
export type CourseSchemaForm = z.infer<typeof CourseZodSchemaForm>;

export const CourseZodSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    status: z.enum(["active", "inactive"]),
    instructor: z.string(),
    questions: z.string().optional(),
    price: z.number().optional(),
    organization: z.string(),
    createdAt: z.date(),
});

export type CourseSchema = z.infer<typeof CourseZodSchema>;

export type CourseStatus = "active" | "inactive";
export const courseTableStatuses: CourseStatus[] = ["active", "inactive",];