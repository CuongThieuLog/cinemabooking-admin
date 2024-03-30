import { TypeOf, z } from 'zod'
import { PaginationSchema, PaginationType } from './../../libs/types/pagination'

const CompanyFormSchema = z.object({
  name: z.string().optional(),
  tel: z.string().optional(),
  fax: z.string().optional(),
  address: z.string().optional(),
  license: z.string().optional(),
})

const CompanyUserFormSchema = z.object({
  name: z.string().optional(),
  dept: z.string().optional(),
  tel: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  password_confirmation: z.string().optional(),
})

export const CompanyCreateInputSchema = z.object({
  company: CompanyFormSchema,
  company_user: CompanyUserFormSchema,
})

export const CompanyUpdateInputSchema = z.object({
  id: z.string().or(z.number()),
  company: CompanyFormSchema,
  company_user: CompanyUserFormSchema.merge(
    z.object({
      id: z.string().or(z.number()),
    }),
  ),
})

export type CompanyStatusType = 1 | 2 | 3

type Plan = {
  id: number
  plan_name: string
  slot_num: number
  admin_num: number
  amount: number
  period: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  pivot: {
    company_id: number
    plan_id: number
    expire_from: string
    expire_to: string
    stripe_id: string | null
    stripe_status: string | null
    stripe_error: string | null
    created_at: string
  }
}

type UserSuperAdmin = {
  id: number
  company_id: number
  name: string
  deleted_at: string | null
  tel: string
  dept: string
  email: string
}

export type CompanyUserType = {
  id: number
  company_id: number
  name: string
  email: string
  tel: string
  dept: string
  is_super: number
  company_name: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export type CompanyUserResponseType = {
  data: CompanyUserType
}

export type CompanyType = {
  id: number
  name: string
  address: string
  tel: string
  fax: string
  license: string
  verified_at: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  properties_count: number
  status: CompanyStatusType
  plans: Plan[]
  user_super_admin: UserSuperAdmin[]
  company_users: CompanyUserType[]
}

export const CompanyInputSchema = z.object({
  search: z.string().optional(),
  status: z.number().optional(),
  page: z.number().optional(),
  per_page: z.number().optional(),
})

export type CompanyResponseType = {
  data: CompanyType
}

export type CompanyInputType = {
  search?: string
  status?: number
  page?: number
  per_page?: number
}

export type CompanyListType = {
  data: CompanyType[]
  current_page: number
  per_page: number
  total: number
} & PaginationType

export const CompanyListSchema = z
  .object({
    data: CompanyFormSchema,
  })
  .merge(PaginationSchema)

export type CompanyCreateInputType = TypeOf<typeof CompanyCreateInputSchema>
export type CompanyUpdateInputType = TypeOf<typeof CompanyUpdateInputSchema>
export type SearchInputCompanyList = {
  page?: number
  per_page?: number
  search?: string
  sort_by?: string
  column?: string
  status?: CompanyStatusType
}

export type QueryInputCompanyDetail = {
  id: string
  sort_by?: string
  column?: string
}
export type DeletePropCompany = {
  id: string
}
export const CompanyUserCreateInputSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  dept: z.string().optional(),
  tel: z.string().optional(),
  email: z.string().optional(),
  password: z.string().or(z.null()).optional(),
  password_confirmation: z.string().optional(),
})

export type CompanyUserCreateInputType = TypeOf<typeof CompanyUserCreateInputSchema>
export type CompanySelectType = {
  data: {
    id: number
    name: string
    status: string
  }[]
}

export type CompanyUserListType = {
  data: CompanyUserType[]
}
