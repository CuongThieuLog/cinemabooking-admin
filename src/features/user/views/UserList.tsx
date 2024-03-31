"use client";

import { ReactTable } from "@/libs/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import {
  convertIsPaidText,
  convertTextHasAssets,
  useUserListQuery,
} from "../hooks";
import { INCOME_OPTIONS, ROLE_OPTIONS } from "../options";
import { UserType } from "../type";

const UserList = () => {
  const { tableData } = useUserListQuery();
  const router = useRouter();

  const columns: ColumnDef<UserType>[] = [
    {
      header: "ID",
      accessorKey: "id",
      meta: {
        width: 72,
        headStyle: {
          paddingLeft: 4,
        },
        cellStyle: {
          width: 56,
          textAlign: "center",
          fontSize: 14,
          lineHeight: "20px",
          fontWeight: 400,
          padding: "0 8px",
        },
      },
    },
    {
      header: "Họ và tên",
      accessorKey: "full_name",
      meta: {
        width: 100,
        headStyle: {
          paddingLeft: 4,
        },
        cellStyle: {
          width: 200,
          textAlign: "center",
          fontSize: 14,
          lineHeight: "20px",
          fontWeight: 400,
          padding: "0 8px",
        },
      },
    },
    {
      header: "Email",
      accessorKey: "email",
      meta: {
        width: 100,
        headStyle: {
          paddingLeft: 4,
        },
        cellStyle: {
          width: 200,
          textAlign: "center",
          fontSize: 14,
          lineHeight: "20px",
          fontWeight: 400,
          padding: "0 8px",
        },
      },
    },
    {
      header: "Quyền",
      accessorKey: "role",
      meta: {
        width: 100,
        headStyle: {
          paddingLeft: 4,
        },
        cellStyle: {
          width: 200,
          textAlign: "center",
          fontSize: 14,
          lineHeight: "20px",
          fontWeight: 400,
          padding: "0 8px",
        },
      },
    },
  ];

  return (
    <ReactTable
      {...tableData}
      columns={columns}
      action={{
        disabledDetail: false,
        onDetail: (id) => {
          router.push(`/users/${id}/detail`);
        },
      }}
    />
  );
};

export { UserList };
