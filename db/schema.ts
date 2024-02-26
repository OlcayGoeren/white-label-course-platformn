import { relations } from "drizzle-orm";
import { AnyPgColumn, boolean, date, foreignKey, integer, json, pgTable, primaryKey, serial, text, timestamp, unique, varchar } from "drizzle-orm/pg-core";




// Definition der Organization-Tabelle
export const organization = pgTable('Organization', {
  id: serial('id').primaryKey(),
  telephone: text('telephone').notNull(),
  domain: text('domain').unique().notNull(),
  iban: text('iban').notNull(),
  accountOwner: text('accountOwner').notNull(),
});

// Definition der User-Tabelle
export const user = pgTable('User', {
  id: serial('id').primaryKey(),
  forname: text('forname').notNull(),
  surname: text('surname').notNull(),
  birthdate: date('birthdate').notNull(),
  email: text('email').notNull(),
  role: text('role').notNull(),
  organization: integer('organization').references(() => organization.id).notNull()
}, (t) => ({
  uniq: unique().on(t.email, t.organization),
}));

export const userRelations = relations(user, ({ one }) => ({
  organization: one(organization, {
    fields: [user.organization],
    references: [organization.id]
  }),
}))

export const organizationUserRelations = relations(organization, ({ many }) => ({
  users: many(user),
}))

// // Definition der Course-Tabelle
export const course = pgTable('Course', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull(),
  instructor: integer('instructor').references(() => user.id).notNull(),
  questions: json('questions'),
  price: integer('price').notNull(),
  organization: integer('organization').references(() => organization.id),
});

export const courseOrganizationRelations = relations(course, ({ one }) => ({
  organization: one(organization, {
    fields: [course.organization],
    references: [organization.id]
  }),
}))

export const organizationCourseRelations = relations(organization, ({ many }) => ({
  users: many(user),
}))

export const module = pgTable('Module', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  course: integer('course').references((): AnyPgColumn => course.id).notNull(),
  order: integer('order').notNull(),
  status: varchar('status').notNull(),
  allowPreview: boolean('allowPreview').default(false).notNull(),
  organization: integer('organization').references((): AnyPgColumn => organization.id).notNull(),
});

export const moduleOrganizationRelations = relations(module, ({ one }) => ({
  organization: one(organization, {
    fields: [module.organization],
    references: [organization.id]
  }),
}))

export const organizationModuleRelations = relations(organization, ({ many }) => ({
  module: many(module),
}))

export const moduleCourseRelations = relations(module, ({ one }) => ({
  organization: one(course, {
    fields: [module.course],
    references: [course.id]
  }),
}))

export const courseModuleRelations = relations(course, ({ many }) => ({
  module: many(module),
}))



export const lesson = pgTable('Lesson', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  module: integer('module').references((): AnyPgColumn => module.id),
  order: integer('order'),
  status: text('status'),
  allowPreview: boolean('allowPreview').default(false),
  organization: integer('organization').references((): AnyPgColumn => organization.id).notNull(),
});

export const lessonOrganizationRelations = relations(lesson, ({ one }) => ({
  organization: one(organization, {
    fields: [lesson.organization],
    references: [organization.id]
  }),
}))

export const organizationLessonRelations = relations(organization, ({ many }) => ({
  lesson: many(lesson),
}))

export const lessonModuleRelations = relations(lesson, ({ one }) => ({
  organization: one(module, {
    fields: [lesson.module],
    references: [module.id]
  }),
}))

export const moduleLessonRelations = relations(module, ({ many }) => ({
  module: many(lesson),
}))

export const courseContent = pgTable('CourseContent', {
  id: serial('id').primaryKey(),
  lesson: integer('lesson').references((): AnyPgColumn => lesson.id),
  order: integer('order'),
  lectureType: text('lectureType'),
  lectureConfig: json('lectureConfig'),
  organization: integer('organization').references((): AnyPgColumn => organization.id).notNull(),
});

export const courseContentOrganizationRelations = relations(courseContent, ({ one }) => ({
  organization: one(organization, {
    fields: [courseContent.organization],
    references: [organization.id]
  }),
}))

export const organizationCourseContentRelations = relations(organization, ({ many }) => ({
  courseContent: many(courseContent),
}))


export const courseContentLessonRelations = relations(courseContent, ({ one }) => ({
  organization: one(lesson, {
    fields: [courseContent.lesson],
    references: [lesson.id]
  }),
}))

export const lessonCourseContentRelations = relations(lesson, ({ many }) => ({
  lesson: many(courseContent),
}))



export const question = pgTable('Question', {
  id: serial('id').primaryKey(),
  text: text('text'),
  lesson: integer('lesson').references((): AnyPgColumn => lesson.id),
  user: integer('user').references((): AnyPgColumn => user.id),
  createdAt: timestamp('createdAt', { mode: "string" }).defaultNow(),
  organization: integer('organization').references((): AnyPgColumn => organization.id).notNull(),
});

export const questiontOrganizationRelations = relations(question, ({ one }) => ({
  organization: one(organization, {
    fields: [question.organization],
    references: [organization.id]
  }),
}))

export const organizationQestionRelations = relations(organization, ({ many }) => ({
  courseContent: many(question),
}))

export const questionLessonRelations = relations(question, ({ one }) => ({
  organization: one(lesson, {
    fields: [question.lesson],
    references: [lesson.id]
  }),
}))

export const lessonQuestionRelations = relations(lesson, ({ many }) => ({
  lesson: many(question),
}))

export const questionUserRelations = relations(question, ({ one }) => ({
  organization: one(user, {
    fields: [question.user],
    references: [user.id]
  }),
}))

export const userQuestionRelations = relations(user, ({ many }) => ({
  user: many(question),
}))

export const answer = pgTable('Answer', {
  id: serial('id').primaryKey(),
  text: text('text'),
  question: integer('question').references((): AnyPgColumn => question.id),
  user: integer('user').references((): AnyPgColumn => user.id),
  createdAt: timestamp('createdAt', { mode: "string" }).defaultNow(),
  organization: integer('organization').references((): AnyPgColumn => organization.id).notNull(),
});

export const answerOrganizationRelations = relations(answer, ({ one }) => ({
  organization: one(organization, {
    fields: [answer.organization],
    references: [organization.id]
  }),
}))

export const organizationAnswerRelations = relations(organization, ({ many }) => ({
  courseContent: many(answer),
}))

export const answerUserRelations = relations(answer, ({ one }) => ({
  organization: one(user, {
    fields: [answer.user],
    references: [user.id]
  }),
}))

export const userAnswerRelations = relations(user, ({ many }) => ({
  organization: many(answer),
}))

export const answerQuestionRelations = relations(answer, ({ one }) => ({
  organization: one(question, {
    fields: [answer.question],
    references: [question.id]
  }),
}))

export const questionAnswerRelations = relations(question, ({ many }) => ({
  organization: many(answer),
}))

export const invoice = pgTable('Invoice', {
  id: serial('id').primaryKey(),
  amount: integer('text'),
  date: timestamp('date', { mode: "string" }).defaultNow(),
  user: integer('user').references((): AnyPgColumn => user.id),
  course: integer('course').references((): AnyPgColumn => course.id),
  organization: integer('organization').references((): AnyPgColumn => organization.id).notNull(),
});

export const insvoiceOrganizationRelations = relations(invoice, ({ one }) => ({
  organization: one(organization, {
    fields: [invoice.organization],
    references: [organization.id]
  }),
}))

export const organizationInvoiceRelations = relations(organization, ({ many }) => ({
  courseContent: many(invoice),
}))

export const insvoiceOUserRelations = relations(invoice, ({ one }) => ({
  organization: one(user, {
    fields: [invoice.user],
    references: [user.id]
  }),
}))

export const userInvoiceRelations = relations(user, ({ many }) => ({
  courseContent: many(invoice),
}))

export const insvoiceCourseRelations = relations(invoice, ({ one }) => ({
  organization: one(course, {
    fields: [invoice.course],
    references: [course.id]
  }),
}))

export const courseInvoiceRelations = relations(course, ({ many }) => ({
  courseContent: many(invoice),
}))
