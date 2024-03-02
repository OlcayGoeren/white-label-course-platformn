import { ZodType, ZodTypeAny, z } from "zod";


export const CourseContentZodSchemaForm = z.object({
    lesson: z.string().min(4),
    lectureType: z.string(),
    lectureConfig: z.enum(["active", "inactive"]).default("inactive"),
    order: z.number().nonnegative(),
});
export type CourseContentSchemaForm = z.infer<typeof CourseContentZodSchemaForm>;

export const CourseContentZodSchema = z.object({
    id: z.string(),
    organization: z.string(),
    lesson: z.string().min(4),
    lectureType: z.string(),
    lectureConfig: z.enum(["active", "inactive"]).default("inactive"),
    order: z.number().nonnegative(),
});

export type CourseContentchema = z.infer<typeof CourseContentZodSchema>;


export interface CourseContentWithAllRelations extends CourseContentchema {
    // module: ModuleSchema[];
}