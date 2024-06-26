import { relations } from "drizzle-orm";
import { AnyPgColumn, boolean, date, foreignKey, integer, json, pgTable, primaryKey, uuid, text, timestamp, unique, varchar } from "drizzle-orm/pg-core";




// Definition der Organization-Tabelle
export const organization = pgTable('Organization', {
  id: uuid('id').defaultRandom().primaryKey(),
  telephone: text('telephone').notNull(),
  domain: text('domain').unique().notNull(),
  iban: text('iban').notNull(),
  accountOwner: text('accountOwner').notNull(),
});

// Definition der User-Tabelle
export const user = pgTable('User', {
  id: uuid('id').defaultRandom().primaryKey(),
  forname: text('forname').notNull(),
  surname: text('surname').notNull(),
  birthdate: date('birthdate').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  organization: uuid('organization').references(() => organization.id).notNull(),
  role: text('role').default('user'),
});

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
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').notNull(),
  instructor: uuid('instructor').references(() => user.id).notNull(),
  questions: json('questions'),
  price: integer('price'),
  organization: uuid('organization').references(() => organization.id),
  createdAt: timestamp('createdAt', { mode: "string" }).defaultNow(),
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

export const modulee = pgTable('Module', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  course: uuid('course').references((): AnyPgColumn => course.id).notNull(),
  order: integer('order').notNull(),
  organization: uuid('organization').references((): AnyPgColumn => organization.id).notNull(),
});

export const moduleOrganizationRelations = relations(modulee, ({ one }) => ({
  organization: one(organization, {
    fields: [modulee.organization],
    references: [organization.id]
  }),
}))

export const organizationModuleRelations = relations(organization, ({ many }) => ({
  modulee: many(modulee),
}))

export const moduleCourseRelations = relations(modulee, ({ one }) => ({
  organization: one(course, {
    fields: [modulee.course],
    references: [course.id]
  }),
}))

export const courseModuleRelations = relations(course, ({ many }) => ({
  modulee: many(modulee),
}))



export const lesson = pgTable('Lesson', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  module: uuid('module').references((): AnyPgColumn => modulee.id, { onDelete: "cascade" }),
  order: integer('order'),
  status: text('status').default('inactive'),
  allowPreview: boolean('allowPreview').default(false),
  organization: uuid('organization').references((): AnyPgColumn => organization.id, { onDelete: "cascade" }).notNull(),
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
  organization: one(modulee, {
    fields: [lesson.module],
    references: [modulee.id]
  }),
}))

export const moduleLessonRelations = relations(modulee, ({ many }) => ({
  module: many(lesson),
}))

export const courseContent = pgTable('CourseContent', {
  id: uuid('id').defaultRandom().primaryKey(),
  lesson: uuid('lesson').references((): AnyPgColumn => lesson.id, { onDelete: "cascade" }).notNull(),
  lectureType: text('lectureType'),
  lectureConfig: json('lectureConfig'),
  organization: uuid('organization').references((): AnyPgColumn => organization.id, { onDelete: "cascade" }).notNull(),
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
  id: uuid('id').defaultRandom().primaryKey(),
  text: text('text'),
  lesson: uuid('lesson').references((): AnyPgColumn => lesson.id, { onDelete: "cascade" }),
  user: uuid('user').references((): AnyPgColumn => user.id, { onDelete: "cascade" }),
  createdAt: timestamp('createdAt', { mode: "string" }).defaultNow(),
  organization: uuid('organization').references((): AnyPgColumn => organization.id, { onDelete: "cascade" }).notNull(),
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
  id: uuid('id').defaultRandom().primaryKey(),
  text: text('text'),
  question: uuid('question').references((): AnyPgColumn => question.id, { onDelete: "cascade" }),
  user: uuid('user').references((): AnyPgColumn => user.id),
  createdAt: timestamp('createdAt', { mode: "string" }).defaultNow(),
  organization: uuid('organization').references((): AnyPgColumn => organization.id, { onDelete: "cascade" }).notNull(),
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
  id: uuid('id').defaultRandom().primaryKey(),
  amount: integer('amount'),
  date: timestamp('date', { mode: "string" }).defaultNow(),
  user: uuid('user').references((): AnyPgColumn => user.id, { onDelete: "cascade" }),
  course: uuid('course').references((): AnyPgColumn => course.id, { onDelete: "cascade" }),
  organization: uuid('organization').references((): AnyPgColumn => organization.id, { onDelete: "cascade" }).notNull(),
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
