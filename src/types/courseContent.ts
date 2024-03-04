import { ZodType, ZodTypeAny, z } from "zod";

export const videoConfigSchema = z.object({
    id: z.string(),
    richText: z.string().optional(),
});

export type VideoConfigSchema = z.infer<typeof videoConfigSchema>;

const textConfigSchema = z.object({
    content: z.string(),
    length: z.number().nonnegative(),
});

const quizConfigSchema = z.object({
    questions: z.array(z.string()),
    timeLimit: z.number().optional(),
});

const lectureTypeSchema = z.enum(["video", "text", "quiz"]);

export const CourseContentZodSchemaForm = z.object({
    lesson: z.string().min(4),
    lectureType: lectureTypeSchema,
    lectureConfig: z.union([videoConfigSchema, textConfigSchema, quizConfigSchema])
});

export type CourseContentSchemaForm = z.infer<typeof CourseContentZodSchemaForm>;


export const CourseContentZodSchema = z.object({
    id: z.string(),
    organization: z.string(),
    lesson: z.string().min(4),
    lectureType: lectureTypeSchema,
    lectureConfig: z.union([videoConfigSchema, textConfigSchema, quizConfigSchema])
});

export type CourseContentchema = z.infer<typeof CourseContentZodSchema>;

export const CourseContentZodSchemaUpdateVideo = z.object({
    id: z.string(),
    lesson: z.string().min(4),
    lectureType: lectureTypeSchema,
    lectureConfig: videoConfigSchema
});

export type CourseContentZodSchemaUpdateVideo = z.infer<typeof CourseContentZodSchemaUpdateVideo>;


export interface CourseContentWithAllRelations extends CourseContentchema {
    // module: ModuleSchema[];
}