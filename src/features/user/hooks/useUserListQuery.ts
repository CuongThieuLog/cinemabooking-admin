import { getListUser } from "@/libs/api/user";
import { useTableContext } from "@/libs/components/Table";
import { useQuery } from "@tanstack/react-query";
import { UserListType, UserSearchInputType, UserType } from "..";

export const useUserListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    UserType,
    UserSearchInputType
  >();
  const { page, per_page, search, willing, has_assets, is_paid, income, role } =
    input;
  const { sort_by, column } = sortOptions || {};

  const data = useQuery({
    queryKey: [
      "userList",
      page,
      per_page,
      search,
      sort_by,
      column,
      role,
      has_assets,
      is_paid,
      income,
    ],
    queryFn: () => getListUser({ ...input, ...sortOptions }),
  });

  return {
    tableData: getTableData(data),
  };
};
