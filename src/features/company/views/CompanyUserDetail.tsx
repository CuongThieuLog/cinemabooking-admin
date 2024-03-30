'use client'

import { DetailItem } from '@/features/article/components'
import { deleteCompanyUser, getCompanyUser } from '@/libs/api/company'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { Stack } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

const CompanyUserDetail = () => {
  const { companyUserId, companyId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const { data: companyUserDetailData } = useQuery({
    queryKey: ['companyUser', companyUserId],
    queryFn: () => getCompanyUser(companyUserId as string),
    enabled: !!companyUserId,
  })

  const { mutate } = useMutation({
    mutationFn: deleteCompanyUser,
  })

  const handleDeleteCompanyUser = () => {
    mutate(
      { id: companyUserId as string },
      { onSuccess: () => router.push(`/company/${companyId}/detail`) },
    )
  }

  const pathBreadcrumb = [
    { label: '不動産会社一覧', href: '/company' },
    {
      label: companyUserDetailData?.company_name || '',
      href: `/company/${companyUserDetailData?.company_id}/detail`,
    },
    {
      label: companyUserDetailData?.name || '',
      href: `/company/${companyUserDetailData?.id}`,
    },
  ]

  return (
    <Stack spacing={4}>
      <Header
        title="不動産会社担当者詳細"
        pathArrCustom={pathBreadcrumb}
        deleteFunction={handleOpenModal}
        editPath="edit"
      />

      <Stack spacing="1px">
        <DetailItem label="担当者ID" value={companyUserId as string} />

        <Stack direction="row" spacing={1}>
          <DetailItem label="部署名" value={companyUserDetailData?.name as string} />
          <DetailItem label="携帯電話番号" value={companyUserDetailData?.tel as string} />
        </Stack>

        <DetailItem label="メールアドレス" value={companyUserDetailData?.email as string} />
      </Stack>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteCompanyUser}
        textSubmit="削除する"
        description={`${companyUserDetailData?.name} を削除してよろしいですか？`}
        title="不動産会社担当差削除"
      />
    </Stack>
  )
}

export { CompanyUserDetail }
