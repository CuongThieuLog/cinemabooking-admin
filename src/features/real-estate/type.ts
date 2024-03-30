import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'
import { CompanyType } from '../company'

type Image = {
  id: number
  property_id: number
  position: null
  file_path: string
  created_at: string
  updated_at: string
  deleted_at: null
}

export type IsPublishType = 0 | 1
export type RealEstateStatus = 1 | 2 | 3 | 4
export type Sublease = 0 | 1
export type Announcement = 0 | 1

type RealEstateDetail = {
  id: number
  company_id: number
  name: string
  created_at: string
  updated_at: string
  in_charge_ids: string[]
  amount: string
  rent_fee: string
  yield: string
  station: string
  room_type: string
  address: string
  traffics: string[]
  structure: number | string
  scale: string
  occupation_area: string
  constraints: string
  dominion: string
  units: string
  construction: string
  management: string
  management_fee: string
  deposit: string
  other_fee: string
  state: string
  extradition: string
  lease_from: string
  lease_to: string
  sublease: Sublease
  announcement: Announcement
  note: string
  is_publish: IsPublishType
  deleted_at: null
  builded_year: number
  images: Image[]
  company?: CompanyType
  company_users: string[]
  status: RealEstateStatus
  copy_images: string[]
}

export type RealEstateType = {
  id: number
  company_id: number
  name: string
  address: string
  occupation_area: string
  amount: string
  yield: string
  traffics: string
  station: string
  is_publish: 1 | 0
  builded_year: number
  status: RealEstateStatus
}

export type RealEstateListType = {
  data: RealEstateType[]
} & PaginationType

export type RealEstateSearchInputType = {
  search?: string
  page?: string
  per_page?: string
  amount_from?: string
  amount_to?: string
  occupation_area_from?: string
  occupation_area_to?: string
  builded_year_from?: string
  builded_year_to?: string
  status?: IsPublishType
}

export type RealEstateQueryInputType = {
  column?: string
  sort_by?: 'asc' | 'desc'
} & RealEstateSearchInputType

export type RealEstateDeleteInputType = {
  ids: string[]
}

export const RealEstateCreateInputSchema = z.object({
  company_id: z.number().or(z.string().optional()).optional(),
  in_charge_ids: z.array(z.number().or(z.string().optional())).optional(),
  name: z.string().optional(),
  yield: z.number().or(z.string().optional()).optional(),
  amount: z.number().or(z.string().optional()).optional(),
  rent_fee: z.number().or(z.string().optional()).optional(),
  deposit: z.number().or(z.string().optional()).optional(),
  room_type: z.number().or(z.string().optional()).optional(),
  management_fee: z.number().or(z.string().optional()).optional(),
  station: z.string().optional(),
  traffics: z.array(z.string().optional()).optional(),
  address: z.string().optional(),
  scale: z.string().optional(),
  structure: z.number().or(z.string().optional()).optional(),
  occupation_area: z.string().optional(),
  constraints: z.string().optional(),
  dominion: z.string().optional(),
  units: z.number().or(z.string().optional()).optional(),
  construction: z.date().or(z.string().optional()),
  management: z.string().optional(),
  other_fee: z.number().or(z.string().optional()).optional(),
  extradition: z.string().optional(),
  lease_from: z.string().or(z.date().optional()),
  lease_to: z.string().or(z.date().optional()),
  sublease: z.union([z.literal(0), z.literal(1)]).optional(),
  announcement: z.union([z.literal(0), z.literal(1)]).optional(),
  note: z.string().optional(),
  images: z.array(z.instanceof(File).or(z.object({ file_path: z.string().optional() }))).optional(),
  is_publish: z.union([z.literal(0), z.literal(1)]).optional(),
  copy_images: z.array(z.string().optional()).optional(),
})

export const RealEstateUpdateInputSchema = z
  .object({
    remove_images: z.array(z.string().optional()).optional(),
    id: z.number().optional(),
  })
  .merge(RealEstateCreateInputSchema)

export type RealEstateCreateInputType = TypeOf<typeof RealEstateCreateInputSchema>
export type RealEstateUpdateInputType = TypeOf<typeof RealEstateUpdateInputSchema>
export type RealEstateDetailType = {
  data: RealEstateDetail
}
