'use client'

import { DetailItem } from '@/features/article/components'
import { ButtonAction } from '@/libs/components/Form/Layout/styled'
import { useAuth } from '@/libs/context'
import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import EditIcon from 'public/assets/svgs/edit.svg'

const SelfInfo = () => {
  const { admin } = useAuth()
  const router = useRouter()

  return (
    <Stack spacing="38px">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h2" color="grey.600">
          マイページ
        </Typography>

        <ButtonAction
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => router.push('self-info/edit')}
        >
          編集
        </ButtonAction>
      </Stack>

      <Stack spacing="1px">
        <Stack direction="row">
          <DetailItem label="ID" value={admin?.id as string} />
        </Stack>

        <Stack direction="row" spacing={4}>
          <DetailItem label="名前" value={admin?.name as string} />
          <DetailItem label="メールアドレス" value={admin?.email as string} />
        </Stack>
      </Stack>
    </Stack>
  )
}

export { SelfInfo }
