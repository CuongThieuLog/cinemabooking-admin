'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { StatusTag } from '@/libs/components/StatusTag'
import { ReactTable } from '@/libs/components/Table'
import { mono } from '@/libs/config/theme'
import { formatDate, formatNumber } from '@/utils/format'
import { Stack, Typography } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'
import { useParams, useRouter } from 'next/navigation'
import BookMark from 'public/assets/svgs/book_mark.svg'
import { useState } from 'react'
import {
  convertHasAssetsText,
  convertIncomeText,
  convertWillingText,
  useDeleteUser,
  useUserDetailQuery,
} from '../hooks'
import { BookMarkType } from '../type'

const UserDetail = () => {
  const { userId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const { deleteUser } = useDeleteUser()
  const handleDeleteUser = () => {
    deleteUser(userId as string, {
      onSuccess: () => {
        router.push('/users')
      },
    })
  }

  const { data, isLoading } = useUserDetailQuery(userId as string)
  const columns: ColumnDef<BookMarkType>[] = [
    {
      header: '物件ID',
      accessorKey: 'id',
      meta: {
        width: 72,
        headStyle: {
          textAlign: 'center',
          padding: '0 0 0 4px',
        },
        cellStyle: {
          textAlign: 'center',
          padding: '0 8px',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
        },
      },
    },
    {
      header: 'マンション名',
      accessorKey: 'name',
      meta: {
        width: 176,
        cellStyle: {
          padding: '0 8px',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          color: mono[600],
        },
      },
    },
    {
      header: '所在地',
      accessorKey: 'address',
      meta: {
        cellStyle: {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
        },
      },
    },
    {
      header: '築年数',
      accessorKey: 'builded_year',
      meta: {
        width: 72,
        cellStyle: {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          padding: '0 8px',
          textAlign: 'end',
        },
      },
    },
    {
      header: '平米数（m2）',
      accessorKey: 'occupation_area',
      meta: {
        width: 72,
        cellStyle: {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '14px',
          padding: '0 8px',
          textAlign: 'end',
        },
      },
      cell: ({ row }) => {
        return `${row.original.occupation_area}年`
      },
    },
    {
      header: '価格\n（万円）',
      accessorKey: 'amount',
      meta: {
        width: 88,
        headStyle: {
          whiteSpace: 'pre-line',
          textAlign: 'center',
        },
        cellStyle: {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          padding: '0 8px',
          textAlign: 'end',
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
          fontWeight: 400,
          lineHeight: '20px',
          padding: '0 8px',
          textAlign: 'end',
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
          display: 'flex',
          justifyContent: 'center',
          padding: '0 8px',
        },
      },
      cell: () => {
        return (
          <Stack alignItems="center">
            <StatusTag color="green" text="公開中" width="80px" />
          </Stack>
        )
      },
    },
  ]

  return (
    <Stack spacing={10}>
      <Stack spacing={4}>
        <Header title="ユーザー詳細" editPath="edit" deleteFunction={handleOpenModal} />

        <Stack spacing={2}>
          <Stack spacing="1px">
            <Stack direction="row" gap={4}>
              <DetailItem label="ユーザーID" value={data?.id} isPending={isLoading} />
              <DetailItem label="メールアドレス" value={data?.email} isPending={isLoading} />
            </Stack>

            <Stack direction="row" gap={4}>
              <DetailItem label="名前" value={data?.name} isPending={isLoading} />
              <DetailItem label="電話番号" value={data?.tel} isPending={isLoading} />
            </Stack>

            <Stack direction="row" gap={4}>
              <DetailItem
                label="生年月日"
                value={String(formatDate(data?.birthday as string))}
                isPending={isLoading}
              />
              <DetailItem
                label="現在の年収"
                value={convertIncomeText(data?.income)}
                isPending={isLoading}
              />
            </Stack>

            <Stack direction="row" gap={4}>
              <DetailItem label="住所(自宅)" value={data?.address} isPending={isLoading} />
              <DetailItem
                label="物件購入意欲"
                value={convertWillingText(data?.willing)}
                isPending={isLoading}
              />
            </Stack>

            <Stack direction="row" gap={4}>
              <DetailItem
                label="マンション所有"
                value={convertHasAssetsText(data?.has_assets)}
                isPending={isLoading}
              />
              <DetailItem label="マンション名" value={data?.asset_name} isPending={isLoading} />
            </Stack>

            <Stack direction="row" gap={4}>
              <DetailItem label="マンション号室" value={data?.asset_number} isPending={isLoading} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Stack direction="row" spacing="4px" alignItems="center">
            <BookMark />
            <Typography variant="h3" color="grey.600">
              ブックマークしている物件
            </Typography>
          </Stack>
        </Stack>

        <ReactTable
          data={data?.book_marks || []}
          columns={columns}
          loading={isLoading}
          action={{ disabledDetail: false }}
          hiddenPagination
        />
      </Stack>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteUser}
        textSubmit="削除する"
        description={`${data?.name}を削除してよろしいですか？`}
        title="不動産会社削除"
      />
    </Stack>
  )
}

export { UserDetail }
