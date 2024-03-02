import { ZodType, ZodTypeAny, z } from "zod";
import { CourseContentchema } from "./courseContent";


export const LessonZodSchemaForm = z.object({
    title: z.string().min(4),
    description: z.string().optional(),
    module: z.string(),
    status: z.enum(["active", "inactive"]).default("inactive"),
    allowPreview: z.boolean().default(false),
    order: z.number().nonnegative(),
});
export type LessonSchemaForm = z.infer<typeof LessonZodSchemaForm>;

export const LessonZodSchema = z.object({
    id: z.string(),
    organization: z.string(),
    title: z.string().min(4),
    description: z.string(),
    module: z.string(),
    status: z.enum(["active", "inactive"]).default("inactive"),
    allowPreview: z.boolean().default(false),
    order: z.number().nonnegative(),
});

export type Lessonchema = z.infer<typeof LessonZodSchema>;


export interface LessonWithAllRelations extends Lessonchema {
    courseContents: CourseContentchema[];
}