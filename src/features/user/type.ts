import { PaginationType } from "@/libs/types/pagination";
import { TypeOf, string, z } from "zod";

export type INCOME_OPTIONS_TYPE = {
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  label: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  tel: string;
  willing: number;
  income: number;
  has_assets: 0 | 1;
  amount_used: string;
  is_paid: 0 | 1;
};

export type UserListType = {
  data: UserType[];
} & PaginationType;

export type UserSearchInputType = {
  search?: string;
  has_assets?: number;
  income?: number;
  is_paid?: number;
  willing?: number;
  number_of_application_from?: string;
  number_of_application_to?: string;
  page?: string;
  per_page?: string;
  role?: string;
} & PaginationType;

export type UserListQueryInputType = {
  column?: string;
  sort_by?: "asc" | "desc";
} & UserSearchInputType;

export type BookMarkType = {
  id: string;
  name: string;
  address: string;
  builded_year: string;
  occupation_area: number;
  amount: number;
  yield: number;
};

export type UserDetailType = {
  id: string;
  name: string;
  birthday: string;
  address: string;
  has_assets: 0 | 1;
  asset_number: number;
  email: string;
  tel: string;
  income: number;
  willing: number;
  asset_name: string;
  book_marks: BookMarkType[];
};

export type UserDetailResponseType = {
  data: UserDetailType;
};

export type DeleteUserParam = {
  userId: string;
};

export type QueryInputUserDetailType = {
  userId: string;
  sort_by?: string;
  column?: string;
};

export const UserCreateInputSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  tel: z.string().optional().nullable(),
  birthday: z.string().or(z.date().optional()).optional(),
  password: z.string().optional(),
  willing: z.string().or(z.number().optional()).optional(),
  has_assets: z.number().optional(),
  asset_name: z.string().optional().nullable(),
  asset_number: z
    .string()
    .or(z.number().optional().nullable())
    .optional()
    .nullable(),
  income: z.string().or(z.number().optional()).optional(),
});

export const UserUpdateInputSchema = z
  .object({
    id: string(),
  })
  .merge(UserCreateInputSchema);

export type UserCreateInputType = TypeOf<typeof UserCreateInputSchema>;
export type UserUpdateInputType = TypeOf<typeof UserUpdateInputSchema>;
