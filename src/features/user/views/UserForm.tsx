'use client'

import { DetailItem } from '@/features/article/components'
import { DatePicker } from '@/libs/components/DatePicker'
import { Input, InputPassword, RadioGroup, Select } from '@/libs/components/Form'
import { FormLayout } from '@/libs/components/Form/Layout/FormLayout'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUserCreate } from '../hooks/useUserCreate'
import { useUserDetail } from '../hooks/useUserDetail'
import { useUserUpdate } from '../hooks/useUserUpdate'
import { HAS_ASSETS_OPTIONS, INCOME_OPTIONS, WILLINGNESS_OPTIONS } from '../options'
import { UserCreateInputSchema, UserCreateInputType } from '../type'

const UserForm = () => {
  const router = useRouter()
  const { userId } = useParams()
  const { data: userDetail } = useUserDetail(userId as string)

  const {
    control,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm<UserCreateInputType>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      address: '',
      asset_name: '',
      asset_number: '',
      birthday: '',
      has_assets: 0,
      income: '',
      tel: '',
      willing: '',
    },
    resolver: zodResolver(UserCreateInputSchema),
    values: userDetail,
  })

  const { mutate: createUser } = useUserCreate(setError)
  const { mutate: updateUser } = useUserUpdate(setError)

  const onSubmit: SubmitHandler<UserCreateInputType> = (data) => {
    if (userId) {
      updateUser(
        { id: userId as string, ...data },
        {
          onSuccess: () => router.push(`/users/${userId}/detail`),
        },
      )
      return
    }

    createUser(data, {
      onSuccess: () => router.push('/users'),
    })
  }

  const disabledAssets = watch('has_assets') == HAS_ASSETS_OPTIONS[1].value

  useEffect(() => {
    if (disabledAssets) {
      setValue('asset_name', '')
      setValue('asset_number', '')
    }
  }, [disabledAssets, setValue])

  return (
    <FormLayout
      title={userId ? 'ユーザー詳細' : 'ユーザー登録'}
      onSubmit={handleSubmit(onSubmit)}
      isDirty={isDirty}
    >
      <Stack direction="row">
        <Stack spacing="1px">
          <Stack direction="row" alignItems="center" spacing={4}>
            <DetailItem label="ユーザー情報" value={userDetail?.id ? userDetail.id : '-'} />

            <Input
              control={control}
              name="email"
              label="メールアドレス"
              labelLeft
              width="320px"
              placeholder="入力してください"
              autoComplete="email"
            />
          </Stack>

          <Stack direction="row" gap={4}>
            <Input
              control={control}
              name="name"
              label="名前"
              labelLeft
              width="320px"
              placeholder="入力してください"
            />

            <InputPassword
              control={control}
              name="password"
              label="パスワード"
              labelLeft
              width="320px"
              placeholder="英数字記号8文字以上で入力してください"
              autoComplete="new-password"
            />
          </Stack>

          <Stack direction="row" gap={4}>
            <Input
              control={control}
              name="tel"
              label="電話番号"
              labelLeft
              width="320px"
              placeholder="入力してください"
            />

            <DatePicker
              control={control}
              name="birthday"
              label="生年月日"
              labelLeft
              sx={{ width: '320px' }}
              placeholder="選択してください"
              width="320px"
            />
          </Stack>

          <Stack direction="row" gap={4}>
            <Input
              control={control}
              name="address"
              label="住所(自宅)"
              labelLeft
              width="320px"
              placeholder="入力してください"
            />

            <Select
              control={control}
              name="income"
              label="現在の年収"
              labelLeft
              width="320px"
              placeholder="選択してください"
              options={INCOME_OPTIONS}
              hiddenEmpty
            />
          </Stack>

          <Stack direction="row" gap={4}>
            <Select
              control={control}
              name="willing"
              label="物件購入意欲"
              labelLeft
              options={WILLINGNESS_OPTIONS}
              placeholder="選択してください"
              width="320px"
              hiddenEmpty
            />

            <RadioGroup
              control={control}
              name="has_assets"
              label="マンション所有(自宅)"
              labelLeft
              width="320px"
              options={HAS_ASSETS_OPTIONS}
            />
          </Stack>

          <Stack direction="row" gap={4}>
            <Input
              control={control}
              name="asset_name"
              label="マンション名"
              labelLeft
              width="320px"
              placeholder="入力してください"
              disabled={disabledAssets}
            />

            <Input
              control={control}
              name="asset_number"
              label="マンション号室"
              labelLeft
              width="320px"
              placeholder="入力してください"
              disabled={disabledAssets}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { UserForm }
