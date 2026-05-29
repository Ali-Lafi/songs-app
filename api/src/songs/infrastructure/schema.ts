import { timestamp, pgTable, serial, text } from "drizzle-orm/pg-core";

export const songsTable = pgTable('songs',{
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    singer:text('singer').notNull(),
    coverImageUrl: text('cover_image_url'),
    album: text('album'),
    duration: text('duration'),
    createdAt: timestamp('created_at').defaultNow().notNull()
})