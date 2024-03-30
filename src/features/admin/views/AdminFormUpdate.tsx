'use client'

import { getAdmin, updateAdmin } from '@/libs/api/admin'
import { Input, InputPassword } from '@/libs/components/Form'
import { FormLayout } from '@/libs/components/Form/Layout/FormLayout'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AdminUpdateInputFormSchema, AdminUpdateInputFormType } from '..'

const AdminFormUpdate = () => {
  const router = useRouter()
  const { adminId } = useParams()
  const query = useQuery({
    queryKey: ['admin', adminId],
    queryFn: () => getAdmin(adminId as string),
    enabled: !!adminId,
  })

  const {
    control,
    handleSubmit,
    setError,
    formState: { isDirty },
    watch,
  } = useForm<AdminUpdateInputFormType>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
    },
    values: {
      email: query.data?.email as string,
      name: query.data?.name as string,
      password: undefined,
      password_confirmation: undefined,
    },
    resolver: zodResolver(AdminUpdateInputFormSchema),
  })

  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorMessage = responseData?.message
    const errorValidation = responseData?.errors

    // if (errorMessage) {
    //   setError('email', { message: errorMessage })
    // }

    if (errorValidation) {
      const { email, password, name, password_confirmation } = errorValidation

      if (email) {
        setError('email', { message: email })
      }

      if (password) {
        setError('password', { message: password })
      }

      if (password_confirmation) {
        setError('password_confirmation', { message: password_confirmation })
      }

      if (name) {
        setError('name', { message: name })
      }
    }
  }

  const { mutate: update } = useMutation({
    mutationFn: updateAdmin,
    onSuccess: () => {
      router.push('/admins')
    },
    onError: handleMutationError,
  })

  const onSubmit: SubmitHandler<AdminUpdateInputFormType> = (data) => {
    update({ ...data, id: adminId as string })
  }

  const disabledConfirmPassword = watch('password') ? false : true

  return (
    <FormLayout title="管理者編集" onSubmit={handleSubmit(onSubmit)} isDirty={isDirty}>
      <Stack direction="row">
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
                管理者ID
              </Typography>
            </Stack>

            <Typography color="grey.600" variant="body2" fontWeight={400}>
              {adminId}
            </Typography>
          </Stack>

          <Stack direction="row" gap={4}>
            <Input control={control} name="name" label="管理者名" labelLeft width="320px" />
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
              labelLeft
              width="320px"
              placeholder="変更する場合のみ入力してください"
            />

            <InputPassword
              control={control}
              name="password_confirmation"
              label="パスワード確認"
              labelLeft
              width="320px"
              placeholder="変更する場合のみ入力してください"
              disabled={disabledConfirmPassword}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { AdminFormUpdate }
