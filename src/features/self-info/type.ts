import { z } from "zod";

const SelfInfoSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.string(),
});

export const SelfInfoUpdateInputSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  password_confirmation: z.string().optional(),
});

export type SelfInfoType = z.infer<typeof SelfInfoSchema>;
export type SelfInfoUpdateInputType = z.infer<typeof SelfInfoUpdateInputSchema>;
