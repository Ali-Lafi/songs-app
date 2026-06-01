import {z} from 'zod'

export const LoginSchema =z.object({
    email:z.email("Invalid email"),
    password: z.string().min(1,"Password is required")
})

export const loginResponseSchema = z.object({
    accessToken: z.string()
})

export type LoginInput = z.infer<typeof LoginSchema>;