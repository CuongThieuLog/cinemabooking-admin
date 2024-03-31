"use client";

import { FilterBar, FilterColumn } from "@/libs/components/Table/FilterBar";
import { ExVoid } from "@/libs/types/utils";
import { Stack, Typography } from "@mui/material";
import { UserSearchInputType } from "..";
import { ROLE_OPTIONS } from "../options";

export function UserFilter() {
  const filterColumn: FilterColumn<ExVoid<UserSearchInputType>>[] = [
    {
      field: "search",
      type: "text",
      placeholder: "Tìm kiếm",
      defaultValue: "",
      sx: { width: 240 },
      fieldOptions: {
        searchIcon: true,
        hasLine: true,
      },
    },
    {
      field: "role",
      type: "select",
      placeholder: "Quyền",
      defaultValue: "",
      options: ROLE_OPTIONS,
      label: "Quyền",
      sx: { width: 240 },
      fieldOptions: {
        groupField: true,
      },
    },
  ];

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        Danh sách người dùng
      </Typography>

      <FilterBar
        columns={filterColumn}
        createPath="users/create"
        buttonSearchUnderButtonCreate
        disabledCreate={true}
      />
    </Stack>
  );
}
