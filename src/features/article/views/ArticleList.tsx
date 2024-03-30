'use client'

import { StatusTag } from '@/libs/components/StatusTag'
import { ReactTable } from '@/libs/components/Table'
import { formatDate, formatDateTime } from '@/utils/format'
import { ColumnDef } from '@tanstack/react-table'
import { convertArticleStatus } from '../hooks/convert'
import { useArticleQuery } from '../hooks/useArticleQuery'
import { ArticleType } from '../type'

const ArticleList = () => {
  const { tableData } = useArticleQuery()

  const columns: ColumnDef<ArticleType>[] = [
    {
      header: 'コンテンツID',
      accessorKey: 'id',
      meta: {
        width: 72,
        headStyle: {
          padding: '0 8px 0 4px',
        },
        cellStyle: {
          textAlign: 'center',
          padding: '0 8px 0 4px',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
        },
      },
      enableSorting: false,
    },
    {
      header: 'タイトル',
      accessorKey: 'title',
      meta: {
        width: 600,
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
        },
      },
    },
    {
      header: '作成日時',
      accessorKey: 'created_at',
      meta: {
        width: 120,
        cellStyle: {
          fontSize: 12,
          lineHeight: '16px',
        },
      },
      cell: ({ row }) => {
        return formatDateTime(row.original.created_at)
      },
    },
    {
      id: 'admin_name',
      header: '作成者',
      accessorKey: 'admin.name',
      meta: {
        width: 160,
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
        },
      },
    },
    {
      header: '公開日時',
      accessorKey: 'publish_start',
      meta: {
        width: 120,
        cellStyle: {
          fontSize: 12,
          lineHeight: '16px',
        },
      },
      cell: ({ row }) => {
        return formatDate(row.original.publish_start)
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
      cell: ({ row }) => <StatusTag {...convertArticleStatus(row.original.status)} />,
    },
  ]

  return <ReactTable {...tableData} columns={columns} action={{ disabledDetail: false }} />
}

export { ArticleList }
