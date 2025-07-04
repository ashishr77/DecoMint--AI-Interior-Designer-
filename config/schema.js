import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    imageUrl: varchar('imageUrl').notNull(),
    credits: integer('credits').default(5),
    clerkUserId: varchar('clerkUserId').unique().notNull()
})

export const AiGeneratedImage = pgTable('aiGeneratedImage', {
    id: serial('id').primaryKey(),
    type: varchar('type').notNull(),
    style: varchar('style').notNull(),
    lighting: varchar('lighting'),
    storages: varchar('storages'),
    furniture: varchar('furniture'),
    mood: varchar('mood'),
    smart: varchar('smart'),
    sustainability: varchar('sustainability'),
    rental: varchar('rental'),
    budget: integer('budget'),
    additional: varchar('additional'),
    orgImage: varchar('orgImage').notNull(),
    aiImage: varchar('aiImage').notNull(),
    userEmail: varchar('userEmail')
});