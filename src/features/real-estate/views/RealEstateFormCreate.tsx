'use client'

import { DetailItem } from '@/features/article/components/DetailItem'
import { DatePicker } from '@/libs/components/DatePicker'
import { FormLayout, Input, InputNumber, RadioGroup, Select } from '@/libs/components/Form'
import { SelectStatus } from '@/libs/components/Form/Select/SelectStatus'
import { TagInput } from '@/libs/components/Form/TagInput'
import { UploadImage } from '@/libs/components/Form/UploadImg'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useCompaniesQuery,
  useCompanyUserQuery,
  useCreateRealEstate,
  useRealEstateDetailQuery,
} from '../hooks'
import { RealEstateCreateInputSchema, RealEstateCreateInputType } from '../type'
import {
  ANNOUNCEMENT_OPTIONS,
  REAL_ESTATE_PUBLISH_OPTIONS,
  ROOM_TYPE_OPTIONS,
  STRUCTURE_OPTIONS,
  SUBLEASE_OPTIONS,
} from '../utils/consts'

const RealEstateFormCreate = () => {
  const { get } = useSearchParams()
  const copyId = get('copy')
  const { data: realEstateDetail, isLoading } = useRealEstateDetailQuery(copyId as string)

  const {
    handleSubmit,
    control,
    formState: { isDirty },
    setError,
    setValue,
    watch,
  } = useForm<RealEstateCreateInputType>({
    defaultValues: {
      address: '',
      amount: '',
      company_id: '',
      announcement: 1,
      construction: '',
      constraints: '',
      deposit: '',
      dominion: '',
      extradition: '',
      images: [],
      in_charge_ids: [],
      lease_from: undefined,
      lease_to: undefined,
      management: '',
      management_fee: '',
      name: '',
      note: '',
      occupation_area: '',
      other_fee: '',
      rent_fee: '',
      room_type: '',
      scale: '',
      station: '',
      structure: '',
      sublease: 0,
      traffics: ['', ''],
      units: '',
      yield: '',
      is_publish: 0,
    },
    resolver: zodResolver(RealEstateCreateInputSchema),
    values: realEstateDetail,
  })

  const { mutate, isPending } = useCreateRealEstate(setError)
  const { companyOptions } = useCompaniesQuery()
  const { companyUserOptions } = useCompanyUserQuery(watch('company_id'))
  const realEstateBreadCrumbs = [{ label: '物件一覧', href: '/' }, { label: '物件登録' }]
  const onSubmit: SubmitHandler<RealEstateCreateInputType> = (data) => {
    const { images, ...rest } = data
    const imageFile = images?.filter((item) => item instanceof File) as File[]
    const imageFilePath = (images as { file_path: string }[])
      .map((item) => item.file_path)
      .filter((item) => item !== undefined)

    if (copyId) {
      mutate({ ...rest, copy_images: imageFilePath, images: imageFile })
      return
    }

    mutate({ ...rest, images: imageFile || [] })
  }

  useEffect(() => {
    const subs = watch((_value, { name }) => {
      if (name === 'company_id') {
        setValue('in_charge_ids', [])
      }
    })
    return () => subs.unsubscribe()
  }, [watch, setValue])

  const LeaseFrom = watch().lease_from as Date
  const LeaseTo = watch().lease_to as Date

  return (
    <FormLayout
      isDirty={isDirty}
      title="物件登録"
      onSubmit={handleSubmit(onSubmit)}
      pathArrCustom={realEstateBreadCrumbs}
      isLoading={isLoading}
      skeleton={{ rows: 15, cols: 2 }}
      submitLoading={isPending}
    >
      <Stack spacing={3}>
        <Stack spacing="1px">
          <Stack direction="row" spacing={4}>
            <DetailItem label="物件ID" value="-" />

            <SelectStatus
              control={control}
              name="is_publish"
              labelLeft
              label="ステータス"
              haveIndicator
              options={REAL_ESTATE_PUBLISH_OPTIONS}
            />
          </Stack>

          <Select
            control={control}
            name="company_id"
            options={companyOptions}
            label="不動産会社"
            width="320px"
            placeholder="選択してください"
            labelLeft
            hiddenEmpty
            selectedColor="mono.500"
          />

          <TagInput
            control={control}
            name="in_charge_ids"
            width="800px"
            label="不動産会社担当"
            labelLeft
            options={companyUserOptions}
            multiple
          />

          <Stack direction="row" spacing={4}>
            <Input
              label="マンション名"
              control={control}
              name="name"
              labelLeft
              width="320px"
              placeholder="入力してください"
            />
            <InputNumber
              label="販売価格"
              control={control}
              name="amount"
              labelLeft
              width="288px"
              labelRight="万円"
              placeholder="入力してください"
            />
          </Stack>

          <Stack direction="row" spacing={4}>
            <InputNumber
              control={control}
              label="想定利回り"
              name="yield"
              labelLeft
              labelRight="%"
              width="300px"
              placeholder="入力してください"
              scaleFormat={2}
            />

            <InputNumber
              label="賃料"
              control={control}
              name="rent_fee"
              labelLeft
              width="288px"
              labelRight="円/月"
              placeholder="入力してください"
            />
          </Stack>

          <Stack direction="row" spacing={4}>
            <InputNumber
              control={control}
              label="管理費"
              name="management_fee"
              labelLeft
              labelRight="円"
              width="300px"
              placeholder="入力してください"
            />

            <InputNumber
              label="修繕積立金"
              control={control}
              name="deposit"
              labelLeft
              width="288px"
              labelRight="円/月"
              placeholder="入力してください"
            />
          </Stack>

          <Stack direction="row" spacing={4}>
            <Input
              control={control}
              label="最寄駅"
              name="station"
              labelLeft
              width="320px"
              placeholder="入力してください"
            />

            <Select
              label="間取りタイプ"
              control={control}
              name="room_type"
              labelLeft
              width="320px"
              placeholder="選択してください"
              options={ROOM_TYPE_OPTIONS}
              hiddenEmpty
            />
          </Stack>

          <Stack direction="row" spacing={4}>
            <Input
              control={control}
              label="交通 ①"
              name="traffics.0"
              labelLeft
              width="320px"
              placeholder="入力してください"
            />

            <Input
              control={control}
              label="交通 ②"
              name="traffics.1"
              labelLeft
              width="320px"
              placeholder="入力してください"
            />
          </Stack>

          <Stack direction="row" spacing={4}>
            <Input
              control={control}
              label="所在地"
              name="address"
              labelLeft
              width="320px"
              placeholder="入力してください"
            />

            <Select
              label="建物構造"
              control={control}
              options={STRUCTURE_OPTIONS}
              name="structure"
              labelLeft
              width="320px"
              placeholder="選択してください"
              hiddenEmpty
            />
          </Stack>

          <Stack direction="row" spacing={4}>
            <Input
              control={control}
              label="フロア"
              name="scale"
              labelLeft
              width="320px"
              placeholder="入力してください"
            />

            <InputNumber
              label="専有面積"
              control={control}
              name="occupation_area"
              labelLeft
              width="300px"
              labelRight="㎡"
              placeholder="入力してください"
            />
          </Stack>

          <Stack direction="row" spacing={4}>
            <Input
              control={control}
              label="用途制限"
              name="constraints"
              labelLeft
              width="320px"
              placeholder="入力してください"
            />

            <Input
              label="土地権利"
              control={control}
              name="dominion"
              labelLeft
              width="320px"
              placeholder="入力してください"
            />
          </Stack>

          <Stack direction="row" spacing={4}>
            <InputNumber
              control={control}
              label="総戸数"
              name="units"
              labelLeft
              labelRight="戸"
              width="300px"
              placeholder="入力してください"
            />

            <DatePicker
              name="construction"
              control={control}
              labelLeft
              label="築年月"
              width="320px"
              placeholder="選択してください"
            />
          </Stack>

          <Stack direction="row" spacing={4}>
            <Input
              control={control}
              label="管理会社"
              name="management"
              labelLeft
              width="320px"
              placeholder="入力してください"
            />

            <Input
              name="other_fee"
              control={control}
              labelLeft
              label="その他金額"
              width="320px"
              placeholder="入力してください"
            />
          </Stack>

          <Input
            control={control}
            label="引渡日"
            name="extradition"
            labelLeft
            width="320px"
            placeholder="入力してください"
          />

          <Stack direction="row" spacing="10px" alignItems="center">
            <DatePicker
              control={control}
              name="lease_from"
              label="賃貸借期間"
              labelLeft
              width="320px"
              placeholder="選択してください"
              maxDate={LeaseTo}
            />
            <Typography variant="subtitle1">〜</Typography>
            <DatePicker
              control={control}
              name="lease_to"
              width="320px"
              placeholder="選択してください"
              minDate={LeaseFrom}
            />
          </Stack>

          <Stack direction="row" spacing={4}>
            <RadioGroup
              width="320px"
              control={control}
              label="サブリース"
              labelLeft
              name="sublease"
              options={SUBLEASE_OPTIONS}
            />

            <RadioGroup
              width="320px"
              control={control}
              label="告知事項"
              labelLeft
              name="announcement"
              options={ANNOUNCEMENT_OPTIONS}
            />
          </Stack>

          <Input
            control={control}
            label="備考"
            name="note"
            labelLeft
            width="800px"
            multiline
            rows={3}
            padding="0px"
            labelHeight="auto"
          />
        </Stack>

        <UploadImage control={control} name="images" multiple />
      </Stack>
    </FormLayout>
  )
}

export { RealEstateFormCreate }
