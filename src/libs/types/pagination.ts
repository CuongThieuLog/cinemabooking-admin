import { TypeOf, z } from 'zod'

const LinkData = z.object({
  url: z.string(),
  label: z.string(),
  active: z.boolean(),
})

export const PaginationSchema = z.object({
  current_page: z.number(),
  first_page_url: z.string(),
  from: z.number(),
  last_page: z.number(),
  last_page_url: z.string(),
  links: z.array(LinkData),
  next_page_url: z.string(),
  path: z.string(),
  per_page: z.number(),
  prev_page_url: z.string(),
  to: z.number(),
  total: z.number(),
})

export type PaginationType = TypeOf<typeof PaginationSchema>
