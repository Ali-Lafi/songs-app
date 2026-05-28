import {z} from 'zod'

export const createSongSchema =z.object({
    name: z.string().min(1,"Song name is required"),
    singer: z.string().min(1, "Singer is required"),
    coverImageUrl: z.url("Cover image must be a valid URL").optional(),
    album:z.string().optional(),
    duration: z.string().optional()
})