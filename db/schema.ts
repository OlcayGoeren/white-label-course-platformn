import { AnyPgColumn, boolean, date, foreignKey, integer, json, pgTable, primaryKey, serial, text, timestamp, unique, varchar } from "drizzle-orm/pg-core";



// export const user = pgTable("user", {
//   firstName: text("firstName"),
//   lastName: text("lastName"),
// }, (table) => {
//   return {
//     pk: primaryKey({ columns: [table.firstName, table.lastName] }),
//   };
// });

// export const profile = pgTable("profile", {
//   id: serial("id").primaryKey(),
//   userFirstName: text("user_first_name"),
//   userLastName: text("user_last_name"),
// }, (table) => {
//   return {
//     userReference: foreignKey({
//       columns: [table.userFirstName, table.userLastName],
//       foreignColumns: [user.firstName, user.lastName],
//       name: "custom_fk"
//     })
//   }
// })


// Definition der Organization-Tabelle
export const organization = pgTable('Organization', {
  id: serial('id').primaryKey(),
  telephone: text('telephone').notNull(),
  domain: text('domain').notNull(),
  linkedin: text('linkedin'),
  instagram: text('instagram'),
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
  organization: integer('organization').references(() => organization.id).notNull(),
  gender: text('gender').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  country: text('country').notNull(),
  postalCode: integer('postalCode').notNull()
}, (t) => ({
  unq: unique().on(t.email, t.organization),
}));

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

export const lesson = pgTable('Lesson', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  description: varchar('description'),
  module: integer('module').references((): AnyPgColumn => module.id),
  order: integer('order'),
  status: varchar('status'),
  allowPreview: boolean('allowPreview').default(false),
  organization: integer('organization').references((): AnyPgColumn => organization.id).notNull(),
});


export const courseContent = pgTable('CourseContent', {
  id: serial('id').primaryKey(),
  lesson: integer('lesson').references((): AnyPgColumn => lesson.id),
  order: integer('order'),
  lectureType: text('lectureType'),
  lectureConfig: json('lectureConfig'),
  organization: integer('organization').references((): AnyPgColumn => organization.id).notNull(),
});

export const question = pgTable('Question', {
  id: serial('id').primaryKey(),
  text: text('text'),
  lesson: integer('lesson').references((): AnyPgColumn => lesson.id),
  user: integer('user').references((): AnyPgColumn => user.id),
  createdAt: timestamp('createdAt', { mode: "string" }).defaultNow(),
  organization: integer('organization').references((): AnyPgColumn => organization.id).notNull(),
});

export const answer = pgTable('Answer', {
  id: serial('id').primaryKey(),
  text: text('text'),
  question: integer('question').references((): AnyPgColumn => question.id),
  user: integer('user').references((): AnyPgColumn => user.id),
  createdAt: timestamp('createdAt', { mode: "string" }).defaultNow(),
  organization: integer('organization').references((): AnyPgColumn => organization.id).notNull(),
});

export const invoice = pgTable('Invoice', {
  id: serial('id').primaryKey(),
  amount: integer('text'),
  date: timestamp('date', { mode: "string" }).defaultNow(),
  user: integer('user').references((): AnyPgColumn => user.id),
  course: integer('course').references((): AnyPgColumn => course.id),
  organization: integer('organization').references((): AnyPgColumn => organization.id).notNull(),
});
