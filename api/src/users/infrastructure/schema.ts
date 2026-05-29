import { timestamp, pgTable, serial, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable('users',{
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash:text('password_hash').notNull(),
    role: text('role').notNull().default('email'),
        createdAt: timestamp('created_at').defaultNow().notNull()

})