import { AnyPgColumn, boolean, date, integer, json, pgTable, primaryKey, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const organization = pgTable('Organization', {
  id: serial('id').primaryKey(),
  telephone: varchar('telephone').notNull(),
  domain: varchar('domain').notNull(),
  linkedin: varchar('linkedin'),
  instagram: varchar('instagram'),
  iban: varchar('iban').notNull(),
  accountOwner: varchar('accountOwner').notNull(),
});

export const user = pgTable('User', {
  id: serial('id').primaryKey(),
  forname: varchar('forname').notNull(),
  surname: varchar('surname').notNull(),
  birthdate: date('birthdate').notNull(),
  email: varchar('email').notNull(),
  role: varchar('role').notNull(),
  organization: varchar('organization').references((): AnyPgColumn => organization.id).notNull(),
  gender: varchar('gender').notNull(),
  address: varchar('address').notNull(),
  city: varchar('city').notNull(),
  country: varchar('country').notNull(),
  postalCode: varchar('postalCode').notNull()
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.id, table.email] })
  }
});

export const course = pgTable('Course', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  description: varchar('description').notNull(),
  status: varchar('status').notNull(),
  instructor: varchar('instructor').references((): AnyPgColumn => user.id).notNull(),
  questions: json('questions'),
  price: integer('price').notNull(),
  organization: varchar('organization').references((): AnyPgColumn => organization.id).notNull(),
});


export const module = pgTable('Module', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  description: varchar('description').notNull(),
  course: varchar('course').references((): AnyPgColumn => course.id).notNull(),
  order: integer('order').notNull(),
  status: varchar('status').notNull(),
  allowPreview: boolean('allowPreview').notNull(),
  organization: varchar('organization').references((): AnyPgColumn => organization.id).notNull(),
});

export const lesson = pgTable('Lesson', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  description: varchar('description'),
  module: varchar('module').references((): AnyPgColumn => module.id),
  order: integer('order'),
  status: varchar('status'),
  allowPreview: boolean('allowPreview'),
  organization: varchar('organization').references((): AnyPgColumn => organization.id).notNull(),
});


export const courseContent = pgTable('CourseContent', {
  id: serial('id').primaryKey(),
  lesson: varchar('lesson').references((): AnyPgColumn => lesson.id),
  order: integer('order'),
  lectureType: varchar('lectureType'),
  lectureConfig: json('lectureConfig'),
  organization: varchar('organization').references((): AnyPgColumn => organization.id).notNull(),
});

export const question = pgTable('Question', {
  id: serial('id').primaryKey(),
  text: varchar('text'),
  lesson: varchar('lesson').references((): AnyPgColumn => lesson.id),
  user: varchar('user').references((): AnyPgColumn => user.id),
  createdAt: timestamp('createdAt', { mode: "string" }),
  organization: varchar('organization').references((): AnyPgColumn => organization.id).notNull(),
});

export const answer = pgTable('Answer', {
  id: serial('id').primaryKey(),
  text: varchar('text'),
  question: varchar('question').references((): AnyPgColumn => question.id),
  user: varchar('user').references((): AnyPgColumn => user.id),
  createdAt: timestamp('createdAt', { mode: "string" }),
  organization: varchar('organization').references((): AnyPgColumn => organization.id).notNull(),
});

export const invoice = pgTable('Invoice', {
  id: serial('id').primaryKey(),
  amount: integer('text'),
  date: timestamp('date', { mode: "string" }),
  user: varchar('user').references((): AnyPgColumn => user.id),
  course: varchar('course').references((): AnyPgColumn => course.id),
  organization: varchar('organization').references((): AnyPgColumn => organization.id).notNull(),
});
