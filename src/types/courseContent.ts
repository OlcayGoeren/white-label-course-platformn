import { ZodType, ZodTypeAny, z } from "zod";

export const videoConfigSchema = z.object({
    id: z.string(),
    richText: z.string().optional(),
});

export type VideoConfigSchema = z.infer<typeof videoConfigSchema>;

export const singleQuiz = z.object({
    question: z.string(),
    answer1: z.string(),
    answer2: z.string(),
    answer3: z.string(),
    answer4: z.string(),
    correctAnswer1: z.boolean(),
    correctAnswer2: z.boolean(),
    correctAnswer3: z.boolean(),
    correctAnswer4: z.boolean(),
});
export type Quiz = z.infer<typeof singleQuiz>;


export const quizConfigSchema = z.object({
    quizzes: z.array(singleQuiz),
});

const lectureTypeSchema = z.enum(["video", "quiz"]);

export const CourseContentZodSchemaForm = z.object({
    lesson: z.string().min(4),
    lectureType: lectureTypeSchema,
    lectureConfig: z.union([videoConfigSchema, quizConfigSchema])
});

export type CourseContentSchemaForm = z.infer<typeof CourseContentZodSchemaForm>;

export const CourseContentZodSchemaFormWithId = z.object({
    id: z.string(),
    lesson: z.string().min(4),
    lectureType: lectureTypeSchema,
    lectureConfig: z.union([videoConfigSchema, quizConfigSchema])
});

export type CourseContentZodSchemaFormWithId = z.infer<typeof CourseContentZodSchemaFormWithId>;


export const CourseContentZodSchema = z.object({
    id: z.string(),
    organization: z.string(),
    lesson: z.string().min(4),
    lectureType: lectureTypeSchema,
    lectureConfig: z.union([videoConfigSchema, quizConfigSchema])
});

export type CourseContentchema = z.infer<typeof CourseContentZodSchema>;

export interface CourseContentWithAllRelations extends CourseContentchema {
    // module: ModuleSchema[];
}