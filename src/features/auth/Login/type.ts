import { TypeOf, z } from 'zod'

export const LoginInputSchema = z.object({
  email: z.string(),
  password: z.string(),
})

const AdminInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  is_super: z.number(),
})

export const LoginOutputSchema = z.object({
  token_type: z.string(),
  expires_in: z.number(),
  access_token: z.string(),
  refresh_token: z.string(),
  admin_info: AdminInfoSchema,
})

export const AdminResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    is_super: z.number(),
    deleted_at: z.null().optional(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
})

export type LoginInputType = TypeOf<typeof LoginInputSchema>
export type LoginOutputType = TypeOf<typeof LoginOutputSchema>
export type AdminInfoType = TypeOf<typeof AdminInfoSchema>
export type AdminResponseType = TypeOf<typeof AdminResponseSchema>
