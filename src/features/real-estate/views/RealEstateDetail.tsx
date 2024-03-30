'use client'

import { DetailItem } from '@/features/article/components/DetailItem'
import { deleteRealEstates } from '@/libs/api/real-estate'
import { BreadcrumbType } from '@/libs/components/BreadCrumbs'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { NoData } from '@/libs/components/NoData'
import { statusColors } from '@/libs/config/theme'
import { formatDateJp, formatDateMonthJp } from '@/utils/format'
import { Grid, Stack } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRealEstateDetailQuery } from '../hooks'
import {
  convertRealEstateIsPublish,
  convertRoomTypeText,
  convertStructureText,
} from '../hooks/convert'
import { mapperRemarksText, mapperTrafficsText } from '../hooks/mapper'
import { CustomImage } from '../styled'
import { Announcement, IsPublishType, Sublease } from '../type'

const RealEstateDetail = () => {
  const { realEstateId } = useParams()
  const editPath = `/real-estate/${realEstateId}/edit`
  const copyPath = `/real-estate/create?copy=${realEstateId}`
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const router = useRouter()

  const { data, isLoading } = useRealEstateDetailQuery(realEstateId as string)

  const { mutate, isPending } = useMutation({
    mutationFn: deleteRealEstates,
    onSuccess: () => {
      handleCloseModal()
      router.push('/')
    },
  })

  const handleDeleteRealEstate = () => {
    mutate({ ids: [realEstateId as string] })
  }

  const realEstateDetailPath: BreadcrumbType[] = [
    {
      label: '物件一覧',
      href: '/',
    },
    {
      label: realEstateId as string,
    },
  ]

  if (!data && !isLoading) return <NoData />

  return (
    <Stack spacing={4}>
      <Header
        editPath={editPath}
        copyPath={copyPath}
        deleteFunction={handleOpenModal}
        title="物件詳細"
        pathArrCustom={realEstateDetailPath}
        isPending={isLoading}
      />

      <Stack spacing="1px">
        <Stack direction="row">
          <DetailItem value={data?.id} label="物件ID" isPending={isLoading} />
          <DetailItem
            status={convertRealEstateIsPublish(data?.is_publish as IsPublishType)}
            label="ステータス"
            isPending={isLoading}
          />
        </Stack>

        <Stack direction="row">
          <DetailItem
            value={data?.company && data.company.name}
            label="不動産会社"
            sx={{ color: statusColors.assistant, textDecoration: 'underline' }}
            isPending={isLoading}
          />
        </Stack>

        <Stack direction="row">
          <DetailItem
            value={data?.company_users as []}
            label="不動産会社担当"
            sx={{ color: statusColors.assistant, textDecoration: 'underline', fontWeight: 400 }}
            isPending={isLoading}
          />
        </Stack>

        <Stack direction="row">
          <DetailItem value={data?.name} label="マンション名" isPending={isLoading} />
          <DetailItem value={`${data?.amount}万円`} label="販売価格" isPending={isLoading} />
        </Stack>

        <Stack direction="row">
          <DetailItem value={`${data?.yield}%`} label="想定利回り" isPending={isLoading} />
          <DetailItem value={`${data?.rent_fee}円`} label="賃料" isPending={isLoading} />
        </Stack>

        <Stack direction="row">
          <DetailItem value={`${data?.management_fee}円`} label="管理費" isPending={isLoading} />
          <DetailItem value={`${data?.deposit}円`} label="修繕積立金" isPending={isLoading} />
        </Stack>

        <Stack direction="row">
          <DetailItem value={data?.station} label="最寄駅" isPending={isLoading} />
          <DetailItem
            value={convertRoomTypeText(data?.room_type)}
            label="間取りタイプ"
            isPending={isLoading}
          />
        </Stack>

        <Stack direction="row">
          <DetailItem
            value={mapperTrafficsText(data?.traffics)}
            label="交通"
            isPending={isLoading}
          />
        </Stack>

        <Stack direction="row">
          <DetailItem value={data?.address} label="所在地" isPending={isLoading} />
          <DetailItem
            value={convertStructureText(data?.structure)}
            label="建物構造"
            isPending={isLoading}
          />
        </Stack>

        <Stack direction="row">
          <DetailItem value={data?.scale} label="フロア" isPending={isLoading} />
          <DetailItem value={`${data?.occupation_area}㎡`} label="専有面積" isPending={isLoading} />
        </Stack>

        <Stack direction="row">
          <DetailItem value={data?.constraints} label="用途制限" isPending={isLoading} />
          <DetailItem value={data?.dominion} label="土地権利" isPending={isLoading} />
        </Stack>

        <Stack direction="row">
          <DetailItem value={`${data?.units}戸`} label="総戸数" isPending={isLoading} />
          <DetailItem
            value={formatDateMonthJp(data?.construction) as string}
            label="築年月"
            isPending={isLoading}
          />
        </Stack>

        <Stack direction="row">
          <DetailItem value={data?.management} label="管理会社" isPending={isLoading} />
          <DetailItem value={data?.other_fee} label="その他金額" isPending={isLoading} />
        </Stack>

        <Stack direction="row">
          <DetailItem value={data?.extradition} label="引渡日" isPending={isLoading} />
        </Stack>

        <Stack direction="row">
          <DetailItem
            value={`${formatDateJp(data?.lease_from)} 〜 ${formatDateJp(data?.lease_to)}`}
            label="賃貸借期間"
            isPending={isLoading}
          />
        </Stack>

        <Stack direction="row">
          <DetailItem
            value={mapperRemarksText({
              sublease: data?.sublease as Sublease,
              announcement: data?.announcement as Announcement,
              note: data?.note as string,
            })}
            label="備考"
            isPending={isLoading}
          />
        </Stack>

        {data?.images && (
          <Grid container rowSpacing={2} columns={12} width={928}>
            {data.images.map((image) => (
              <Grid item xs={2} sm={4} md={2.3} key={image.id}>
                <CustomImage
                  alt="image real state"
                  src={image.file_path}
                  key={image.id}
                  width={160}
                  height={160}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteRealEstate}
        textSubmit="削除する"
        description={`${data?.name}を削除してよろしいですか？`}
        title="コンテンツ削除"
        isLoading={isPending}
      />
    </Stack>
  )
}

export { RealEstateDetail }
