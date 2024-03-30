'use client'

import { DetailItem } from '@/features/article/components'
import { updateSelfInfo } from '@/libs/api/self-info'
import { FormLayout, Input, InputPassword } from '@/libs/components/Form'
import { useAuth } from '@/libs/context'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SelfInfoUpdateInputSchema, SelfInfoUpdateInputType } from '..'

const SelfInfoForm = () => {
  const { admin, setAdmin } = useAuth()
  const router = useRouter()
  const {
    control,
    formState: { isDirty },
    watch,
    handleSubmit,
    setError,
  } = useForm<SelfInfoUpdateInputType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    values: {
      name: admin?.name,
      email: admin?.email,
    },
    resolver: zodResolver(SelfInfoUpdateInputSchema),
  })

  const handleUpdateError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors
    const { email, name, password, password_confirmation } = errorValidation

    if (email) {
      setError('email', { message: email })
    }

    if (name) {
      setError('name', { message: name })
    }

    if (password) {
      setError('password', { message: password })
    }

    if (password_confirmation) {
      setError('password_confirmation', { message: password_confirmation })
    }
  }

  const { mutate } = useMutation({
    mutationFn: updateSelfInfo,
    onError: handleUpdateError,
    onSuccess: (data) => {
      setAdmin(data)
      router.push('/self-info')
    },
  })

  const onSubmit: SubmitHandler<SelfInfoUpdateInputType> = (data) => {
    mutate(data)
  }

  const disabledConfirmPassword = !watch('password')

  return (
    <FormLayout
      title="マイページ"
      isDirty={isDirty}
      onSubmit={handleSubmit(onSubmit)}
      hiddenBreadcrumb
    >
      <Stack spacing="1px" mt={2}>
        <Stack>
          <DetailItem label="ID" value={`${admin?.id}` as string} />
        </Stack>

        <Stack direction="row" gap={4}>
          <Input control={control} name="name" label="名前" labelLeft width="320px" />
          <Input
            control={control}
            name="email"
            label="メールアドレス"
            labelLeft
            width="320px"
            autoComplete="email"
          />
        </Stack>

        <Stack direction="row" gap={4}>
          <InputPassword
            control={control}
            name="password"
            autoComplete="new-password"
            label="パスワード"
            placeholder="変更する場合のみ入力してください"
            labelLeft
            width="320px"
          />
          <InputPassword
            control={control}
            name="password_confirmation"
            label="パスワード確認"
            placeholder="変更する場合のみ入力してください"
            labelLeft
            width="320px"
            disabled={disabledConfirmPassword}
          />
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { SelfInfoForm }
