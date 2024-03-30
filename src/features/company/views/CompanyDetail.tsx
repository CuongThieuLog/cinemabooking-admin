'use client'

import { DetailItem } from '@/features/article/components'
import { deleteCompany } from '@/libs/api/company'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { NoData } from '@/libs/components/NoData'
import { ReactTable } from '@/libs/components/Table'
import { ButtonCreate } from '@/libs/components/Table/styled'
import { statusColors } from '@/libs/config/theme'
import { formatDateTime } from '@/utils/format'
import { Stack, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useParams, useRouter } from 'next/navigation'
import AddIcon from 'public/assets/svgs/add.svg'
import CompanyUser from 'public/assets/svgs/company_user.svg'
import IndicatorGreen from 'public/assets/svgs/indicator_green.svg'
import { useState } from 'react'
import { CompanyUserType } from '..'
import { useCompanyDetailQuery } from '../hooks/useCompanyDetailQuery'

const CompanyDetail = () => {
  const router = useRouter()
  const { companyId } = useParams()
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const { data, isLoading } = useCompanyDetailQuery(companyId as string)
  const { mutate } = useMutation({
    mutationFn: deleteCompany,
  })
  const handleDeleteCompany = () => {
    mutate(
      { id: companyId as string },
      {
        onSuccess: () => {
          router.push('/company')
        },
      },
    )
  }

  const columns: ColumnDef<CompanyUserType>[] = [
    {
      header: '担当者ID',
      accessorKey: 'id',
      meta: {
        width: 72,
        headStyle: {
          textAlign: 'center',
          padding: '0 0px 0 3px',
        },
        cellStyle: {
          textAlign: 'center',
          padding: '0 0px 0 3px',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
        },
      },
    },
    {
      header: '登録日時',
      accessorKey: 'created_at',
      meta: {
        width: 120,
        headStyle: {
          padding: '0 8px',
        },
        cellStyle: {
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '16px',
          padding: '0 8px',
        },
      },
      cell: ({ row }) => {
        return formatDateTime(row.original.created_at)
      },
    },
    {
      header: '名前',
      accessorKey: 'name',
      meta: {
        width: 200,
        headStyle: {
          padding: '0 8px',
        },
        cellStyle: {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          padding: '0 8px',
        },
      },
    },
    {
      header: 'メールアドレス',
      accessorKey: 'email',
      meta: {
        width: '45vw',
        headStyle: {
          padding: '0 8px',
        },
        cellStyle: {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          padding: '0 8px',
        },
      },
    },
    {
      header: '部署名',
      accessorKey: 'dept',
      meta: {
        width: 120,
        headStyle: {
          padding: '0 8px',
        },
        cellStyle: {
          fontSize: 12,
          fontWeight: 400,
          lineHeight: '16px',
          padding: '0 8px',
        },
      },
    },
    {
      header: '電話番号',
      accessorKey: 'tel',
      meta: {
        width: 96,
        headStyle: {
          padding: '0 8px',
        },
        cellStyle: {
          fontSize: 12,
          fontWeight: 400,
          lineHeight: '16px',
          padding: '0 8px',
        },
      },
    },
  ]

  if (!data && !isLoading) return <NoData />

  return (
    <Stack spacing="56px">
      <Stack spacing={4}>
        <Header title="不動産会社詳細" editPath="edit" deleteFunction={handleOpenModal} />

        <Stack spacing={2}>
          <Typography variant="h4" color="grey.600">
            会社登録情報
          </Typography>

          <Stack spacing="1px">
            <Stack direction="row" gap={4}>
              <DetailItem label="不動産会社ID" value={companyId ? (companyId as string) : '-'} />

              <Stack spacing={1} direction="row" alignItems="center">
                <Stack
                  height={44}
                  minWidth={120}
                  padding="4px 8px"
                  bgcolor="base.white"
                  justifyContent="center"
                >
                  <Typography variant="body2" color="grey.500">
                    ステータス
                  </Typography>
                </Stack>

                <Stack
                  bgcolor={statusColors.success_pale}
                  py={1}
                  borderRadius="4px"
                  width="82px"
                  height="34px"
                  justifyContent="center"
                  alignItems="center"
                  spacing="10px"
                  direction="row"
                >
                  <IndicatorGreen />

                  <Typography color={statusColors.success} variant="body2">
                    利用中
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Stack direction="row" gap={4}>
              <DetailItem label="不動産会社名" value={data?.name as string} />

              <DetailItem
                label="料金プラン"
                value={data?.plans && data?.plans[0] ? `¥${data.plans[0].amount}` : '-'}
              />
            </Stack>

            <Stack direction="row" gap={4}>
              <DetailItem label="電話番号" value={data?.tel as string} />
              <DetailItem label="FAX番号" value={data?.fax as string} />
            </Stack>

            <Stack direction="row" gap={4}>
              <DetailItem label="住所" value={data?.address as string} />
              <DetailItem label="免許" value={data?.license as string} />
            </Stack>
          </Stack>
        </Stack>

        <Stack spacing={2} mt="19px">
          <Typography variant="h4" color="grey.600">
            代表アカウント情報
          </Typography>

          <Stack spacing="1px">
            <Stack spacing={1} direction="row" alignItems="center">
              <Stack
                height={44}
                minWidth={120}
                padding="4px 8px"
                bgcolor="base.white"
                justifyContent="center"
              >
                <Typography variant="body2" color="grey.500">
                  担当者ID
                </Typography>
              </Stack>

              <Typography color="grey.600" variant="body2" fontWeight={400}>
                {companyId ? companyId : '-'}
              </Typography>
            </Stack>

            <Stack direction="row" gap={4}>
              <DetailItem label="担当者名" value={data?.user_super_admin[0].name as string} />
              <DetailItem label="部署" value={data?.user_super_admin[0].dept as string} />
            </Stack>

            <Stack direction="row" gap={4}>
              <DetailItem label="携帯電話番号" value={data?.user_super_admin[0].tel as string} />
              <DetailItem
                label="メールアドレス"
                value={data?.user_super_admin[0].email as string}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Stack direction="row" spacing="4px" alignItems="flex-end">
            <CompanyUser />
            <Typography variant="h3" color="grey.600">
              担当者
            </Typography>
          </Stack>

          <ButtonCreate
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.replace(`user/create`)}
          >
            新規
          </ButtonCreate>
        </Stack>

        <ReactTable
          data={data?.company_users || []}
          columns={columns}
          action={{
            onDetail: (row) => {
              router.push(`/company/${companyId}/user/${row}/detail`)
            },
          }}
          loading={isLoading}
          hiddenPagination
        />
      </Stack>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteCompany}
        textSubmit="削除する"
        description={`${data?.name} を削除してよろしいですか？`}
        title="不動産会社削除"
      />
    </Stack>
  )
}

export { CompanyDetail }
