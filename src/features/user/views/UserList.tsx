'use client'

import { ReactTable } from '@/libs/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { convertIsPaidText, convertTextHasAssets, useUserListQuery } from '../hooks'
import { INCOME_OPTIONS, WILLINGNESS_OPTIONS } from '../options'
import { UserType } from '../type'

const UserList = () => {
  const { tableData } = useUserListQuery()
  const router = useRouter()

  const columns: ColumnDef<UserType>[] = [
    {
      header: 'ユーザーID',
      accessorKey: 'id',
      meta: {
        width: 72,
        headStyle: {
          paddingLeft: 4,
        },
        cellStyle: {
          width: 56,
          textAlign: 'center',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '0 8px',
        },
      },
    },
    {
      header: '氏名',
      accessorKey: 'name',
      meta: {
        width: 120,
        cellStyle: {
          width: 104,
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '0 8px',
        },
      },
    },
    {
      header: 'メールアドレス',
      accessorKey: 'email',
      meta: {
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '0 8px',
        },
      },
    },
    {
      header: '電話番号',
      accessorKey: 'tel',
      meta: {
        width: 120,
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          width: 104,
          padding: '0 8px',
        },
      },
    },
    {
      header: '購入意欲',
      accessorKey: 'willing',
      meta: {
        width: 148,
        cellStyle: {
          fontSize: 12,
          lineHeight: '16px',
          fontWeight: 400,
          width: 104,
          padding: '0 8px',
        },
      },
      cell: ({ row }) => {
        return WILLINGNESS_OPTIONS[row.original.willing - 1].label
      },
    },
    {
      header: '年収（万）',
      accessorKey: 'income',
      meta: {
        width: 80,
        cellStyle: {
          fontSize: 12,
          lineHeight: '16px',
          fontWeight: 400,
          width: 64,
          padding: '0 8px',
        },
      },
      cell: ({ row }) => {
        return INCOME_OPTIONS[row.original.income - 1].label
      },
    },
    {
      header: 'マンション\n所有',
      accessorKey: 'has_assets',
      meta: {
        width: 80,
        cellStyle: {
          fontSize: 12,
          lineHeight: '16px',
          fontWeight: 400,
          padding: '0 8px',
        },
      },
      cell: ({ row }) => {
        return convertTextHasAssets(row.original.has_assets)
      },
    },
    {
      header: '申込数',
      accessorKey: 'amount_used',
      meta: {
        width: 64,
        headStyle: {
          paddingLeft: '8px',
        },
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '0 8px',
          textAlign: 'end',
        },
      },
      cell: () => {
        return '-'
      },
    },
    {
      header: '料金プラン',
      accessorKey: 'is_paid',
      meta: {
        width: 80,
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '0 8px',
          textAlign: 'start',
        },
      },
      cell: ({ row }) => {
        return convertIsPaidText(row.original.is_paid)
      },
    },
  ]

  return (
    <ReactTable
      {...tableData}
      columns={columns}
      action={{
        disabledDetail: false,
        onDetail: (id) => {
          router.push(`/users/${id}/detail`)
        },
      }}
    />
  )
}

export { UserList }
