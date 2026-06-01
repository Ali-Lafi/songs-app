import {z} from 'zod'

export const createSongSchema =z.object({
    name: z.string().min(1,"Song name is required"),
    singer: z.string().min(1, "Singer is required"),
    coverImageUrl: z.url("Cover image must be a valid URL").optional(),
    album:z.string().optional(),
    duration: z.string().optional()
})

export const listSongsSchema = z.object({
  pageNumber: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(50).default(10),
  search: z.string().optional(),
});
export const songSchema = z.object({
    id: z.number(),
    name: z.string(),
    singer: z.string(),
    coverImageUrl: z.string().nullable(),
    album:z.string().nullable(),
    duration: z.string().nullable(),
    createdAt: z.date()
})

export const paginatedSongsSchema = z.object({
    items: z.array(songSchema),
    total: z.number(),
    pageNumber: z.number(),
    pageSize: z.number()
})

export type CreateSongInput = z.infer<typeof createSongSchema>;
export type ListSongsInput = z.infer<typeof listSongsSchema>;