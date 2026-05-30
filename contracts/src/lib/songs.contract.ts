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

export type CreateSongInput = z.infer<typeof createSongSchema>;
export type ListSongsInput = z.infer<typeof listSongsSchema>;