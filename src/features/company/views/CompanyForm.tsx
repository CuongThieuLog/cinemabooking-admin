'use client'

import { DetailItem } from '@/features/article/components'
import { createCompany, getCompany, updateCompany } from '@/libs/api/company'
import { FormLayout, Input, InputPassword } from '@/libs/components/Form'
import { statusColors } from '@/libs/config/theme'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { Stack, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, usePathname, useRouter } from 'next/navigation'
import IndicatorGreen from 'public/assets/svgs/indicator_green.svg'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CompanyCreateInputType } from '../type'

export const CompanyForm = () => {
  const { companyId } = useParams()
  const router = useRouter()
  const pathName = usePathname()
  const { data: companyDetail } = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => getCompany({ id: companyId as string }),
    enabled: !!companyId,
  })

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { isDirty },
  } = useForm<CompanyCreateInputType>({
    defaultValues: {
      company: {
        address: '',
        license: '',
        fax: '',
        name: '',
        tel: '',
      },
      company_user: {
        dept: '',
        email: '',
        name: '',
        password: '',
        password_confirmation: '',
        tel: '',
      },
    },
    values: {
      company: {
        name: companyDetail?.name,
        tel: companyDetail?.tel,
        address: companyDetail?.address,
        fax: companyDetail?.fax,
        license: companyDetail?.license,
      },
      company_user: {
        dept: companyDetail?.user_super_admin[0].dept,
        email: companyDetail?.user_super_admin[0].email,
        name: companyDetail?.user_super_admin[0].name,
        tel: companyDetail?.user_super_admin[0].tel,
      },
    },
  })

  const handleMutateError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      if (errorValidation['company.name']) {
        setError('company.name', { message: errorValidation['company.name'] })
      }

      if (errorValidation['company.tel']) {
        setError('company.tel', { message: errorValidation['company.tel'] })
      }

      if (errorValidation['company.fax']) {
        setError('company.fax', { message: errorValidation['company.fax'] })
      }

      if (errorValidation['company.address']) {
        setError('company.address', { message: errorValidation['company.address'] })
      }

      if (errorValidation['company.license']) {
        setError('company.license', { message: errorValidation['company.license'] })
      }

      if (errorValidation['company_user.name']) {
        setError('company_user.name', { message: errorValidation['company_user.name'] })
      }

      if (errorValidation['company_user.dept']) {
        setError('company_user.dept', { message: errorValidation['company_user.dept'] })
      }

      if (errorValidation['company_user.tel']) {
        setError('company_user.tel', { message: errorValidation['company_user.tel'] })
      }

      if (errorValidation['company_user.email']) {
        setError('company_user.email', { message: errorValidation['company_user.email'] })
      }

      if (errorValidation['company_user.password']) {
        setError('company_user.password', { message: errorValidation['company_user.password'] })
      }

      if (errorValidation['company_user.password_confirmation']) {
        setError('company_user.password_confirmation', {
          message: errorValidation['company_user.password_confirmation'],
        })
      }
    }
  }

  const { mutate: create } = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      router.push('/company')
    },
    onError: handleMutateError,
  })

  const { mutate: update } = useMutation({
    mutationFn: updateCompany,
    onSuccess: () => {
      router.push('/company')
    },
    onError: handleMutateError,
  })

  const onSubmit: SubmitHandler<CompanyCreateInputType> = (data) => {
    const idCompanyUser = companyDetail?.user_super_admin[0].id

    if (companyId && idCompanyUser) {
      update({
        id: companyId as string,
        company_user: {
          id: idCompanyUser,
          ...data.company_user,
        },
        company: { ...data.company },
      })
      return
    }

    create(data)
  }

  const disabledConfirmPassword = pathName !== '/company/create' && !watch('company_user.password')
  const planAmount =
    companyDetail?.plans && companyDetail?.plans?.[0] ? `¥${companyDetail.plans[0].amount}` : '-'

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={companyId ? '不動産会社編集' : '不動産会社登録'}
      isDirty={isDirty}
    >
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
            <Input
              control={control}
              name="company.name"
              label="不動産会社名"
              labelLeft
              width="320px"
            />

            <DetailItem label="料金プラン" value={planAmount} />
          </Stack>

          <Stack direction="row" gap={4}>
            <Input control={control} name="company.tel" label="電話番号" labelLeft width="320px" />
            <Input control={control} name="company.fax" label="FAX番号" labelLeft width="320px" />
          </Stack>

          <Stack direction="row" gap={4}>
            <Input control={control} name="company.address" label="住所" labelLeft width="320px" />
            <Input control={control} name="company.license" label="免許" labelLeft width="320px" />
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
            <Input
              control={control}
              name="company_user.name"
              label="担当者名"
              labelLeft
              width="320px"
            />

            <Input
              control={control}
              name="company_user.dept"
              label="部署名"
              labelLeft
              width="320px"
            />
          </Stack>

          <Stack direction="row" gap={4}>
            <Input
              control={control}
              name="company_user.tel"
              label="携帯電話番号"
              labelLeft
              width="320px"
            />
            <Input
              control={control}
              name="company_user.email"
              autoComplete="email"
              label="メールアドレス"
              labelLeft
              width="320px"
            />
          </Stack>

          <Stack direction="row" gap={4}>
            <InputPassword
              control={control}
              name="company_user.password"
              autoComplete="new-password"
              label="パスワード"
              placeholder="変更する場合のみ入力してください"
              labelLeft
              width="320px"
            />
            <InputPassword
              control={control}
              name="company_user.password_confirmation"
              label="パスワード確認"
              placeholder="変更する場合のみ入力してください"
              labelLeft
              width="320px"
              disabled={disabledConfirmPassword}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}
