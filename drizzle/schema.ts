import { AnyPgColumn, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const songs = pgTable('Songs', {
  id: serial('id').primaryKey(),
  title: varchar('title'),
  artist: varchar('artist'),
  album: varchar('album'),
  duration: varchar('duration'),
});

export const organization = pgTable('Organization', {
  id: serial('id').primaryKey(),
  telephone: varchar('telephone'),
  domain: varchar('domain'),
  linkedin: varchar('linkedin'),
  instagram: varchar('instagram'),
  iban: varchar('iban'),
  accountOwner: varchar('accountOwner')
});

export const user = pgTable('User', {
  id: serial('id').primaryKey(),
  forname: varchar('forname'),
  surname: varchar('surname'),
  birthdate: varchar('birthdate'),
  email: varchar('email'),
  role: varchar('role'),
  organization: varchar('organization').references((): AnyPgColumn => organization.id)
});

export const instructor = pgTable('Instructor', {
  id: serial('id').primaryKey().references(user, 'id'),
  gender: varchar('gender'),
  address: varchar('address'),
  city: varchar('city'),
  country: varchar('country'),
  postalCode: varchar('postalCode')
});