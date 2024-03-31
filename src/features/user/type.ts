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
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string;
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
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().optional(),
  email_verified: z.string().optional().nullable(),
  password: z.string().optional(),
  role: z.string().optional(),
  created_at: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
});

export const UserUpdateInputSchema = z
  .object({
    id: string(),
  })
  .merge(UserCreateInputSchema);

export type UserCreateInputType = TypeOf<typeof UserCreateInputSchema>;
export type UserUpdateInputType = TypeOf<typeof UserUpdateInputSchema>;
