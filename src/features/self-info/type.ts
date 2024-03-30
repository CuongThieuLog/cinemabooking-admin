import { z } from 'zod'

const SelfInfoSchema = z.object({
  data: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    is_super: z.number(),
  }),
})

export const SelfInfoUpdateInputSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  password_confirmation: z.string().optional(),
})

export type SelfInfoType = z.infer<typeof SelfInfoSchema>
export type SelfInfoUpdateInputType = z.infer<typeof SelfInfoUpdateInputSchema>
