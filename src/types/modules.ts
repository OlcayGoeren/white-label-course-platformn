import { ZodType, ZodTypeAny, z } from "zod";
import { LessonWithAllRelations, Lessonchema } from "./lessons";


export const ModuleZodSchemaForm = z.object({
    title: z.string().min(4),
    course: z.string(),
    order: z.number().nonnegative(),
});
export type ModuleSchemaForm = z.infer<typeof ModuleZodSchemaForm>;

export const ModuleZodSchema = z.object({
    id: z.string(),
    title: z.string(),
    course: z.string(),
    organization: z.string(),
    order: z.number().nonnegative(),
});

export type ModuleSchema = z.infer<typeof ModuleZodSchema>;


export interface ModuleWithAllRelations extends ModuleSchema {
    lessons: LessonWithAllRelations[];
}