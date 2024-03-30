'use client'

import { StatusTag } from '@/libs/components/StatusTag'
import { ReactTable } from '@/libs/components/Table'
import { base } from '@/libs/config/theme'
import { ColumnDef } from '@tanstack/react-table'
import { CompanyType } from '..'
import { convertStatusListValue } from '../hooks/convert'
import { useCompanyQuery } from '../hooks/useCompanyQuery'

const CompanyList = () => {
  const { tableData } = useCompanyQuery()

  const columns: ColumnDef<CompanyType>[] = [
    {
      header: '企業ID',
      accessorKey: 'id',
      meta: {
        width: 72,
        headStyle: {
          padding: '0 4px',
        },
        cellStyle: {
          textAlign: 'center',
          padding: '0 4px',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
        },
      },
    },
    {
      header: '不動産会社名',
      accessorKey: 'name',
      meta: {
        cellStyle: {
          color: base.black,
          textDecoration: 'underline',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
        },
      },
    },
    {
      header: '電話番号',
      accessorKey: 'tel',
      meta: {
        width: 136,
        cellStyle: { fontSize: 14, lineHeight: '20px', fontWeight: 400 },
      },
    },
    {
      header: 'FAX番号',
      accessorKey: 'fax',
      meta: {
        width: 136,
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
        },
      },
    },
    {
      header: '掲載数',
      accessorKey: 'properties_count',
      meta: {
        width: 64,
        cellStyle: {
          textAlign: 'end',
          width: 52,
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
        },
      },
    },
    {
      id: 'plans_amount',
      header: '料金プラン',
      accessorKey: 'plans',
      meta: {
        width: 96,
        cellStyle: {
          textAlign: 'end',
          width: 77,
          fontSize: 12,
          lineHeight: '16px',
        },
      },
      cell: ({ row }) => {
        return `¥${row.original.plans && row.original.plans.length > 0 ? row.original.plans[0].amount : 0}`
      },
    },
    {
      header: 'ステータス',
      accessorKey: 'status',
      meta: {
        width: 96,
        cellStyle: {
          textAlign: 'center',
        },
      },
      cell: ({ row }) => {
        return <StatusTag {...convertStatusListValue(row.original.status)} />
      },
    },
  ]
  return <ReactTable {...tableData} columns={columns} action={{ disabledDetail: false }} />
}

export { CompanyList }
