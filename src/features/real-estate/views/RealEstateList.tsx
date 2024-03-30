'use client'

import { StatusTag } from '@/libs/components/StatusTag'
import { ReactTable } from '@/libs/components/Table'
import { formatNumber } from '@/utils/format'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { convertRealEstateStatus } from '../hooks/convert'
import { useRealStateQuery } from '../hooks/useRealEstateListQuery'
import { RealEstateType } from '../type'

const RealEstateList = () => {
  const { tableData } = useRealStateQuery()
  const router = useRouter()

  const columns: ColumnDef<RealEstateType>[] = [
    {
      header: '物件ID',
      accessorKey: 'id',
      meta: {
        width: 62,
        cellStyle: {
          textAlign: 'center',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
        },
      },
    },
    {
      header: 'マンション名',
      accessorKey: 'name',
      meta: {
        width: 176,
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
        },
      },
    },
    {
      header: '所在地',
      accessorKey: 'address',
      meta: {
        cellStyle: { fontSize: 14, lineHeight: '20px', fontWeight: 400 },
      },
    },
    {
      header: '築年数',
      accessorKey: 'builded_year',
      meta: {
        width: 72,
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          textAlign: 'end',
          padding: '0 8px',
          width: 56,
        },
      },
      cell: ({ row }) => {
        return `${row.original.builded_year}年`
      },
    },
    {
      header: '平米数（m2）',
      accessorKey: 'occupation_area',
      meta: {
        width: 72,
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          textAlign: 'end',
          padding: '0 8px',
          width: 56,
        },
      },
    },
    {
      header: '価格 \n（万円）',
      accessorKey: 'amount',
      meta: {
        width: 88,
        headStyle: {
          textAlign: 'center',
          width: 88,
          whiteSpace: 'pre-line',
        },
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          textAlign: 'end',
          width: 80,
        },
      },
      cell: ({ row }) => {
        return formatNumber(row.original.amount)
      },
    },
    {
      header: '利回り',
      accessorKey: 'yield',
      meta: {
        width: 72,
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          textAlign: 'end',
          padding: '0 8px',
          width: 58,
        },
      },
      cell: ({ row }) => {
        return `${row.original.yield}%`
      },
    },
    {
      header: 'ステータス',
      accessorKey: 'status',
      meta: {
        width: 96,
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          textAlign: 'center',
          padding: '0 8px',
        },
      },
      cell: ({ row }) => <StatusTag {...convertRealEstateStatus(row.original.status)} />,
    },
  ]

  return (
    <ReactTable
      {...tableData}
      columns={columns}
      action={{
        disabledDetail: false,
        onDetail: (id) => {
          router.push(`/real-estate/${id}/detail`)
        },
      }}
      onCopy={(id) => {
        router.push(`/real-estate/create?copy=${id}`)
      }}
      selection
    />
  )
}

export { RealEstateList }
