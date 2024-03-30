'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { useAuth } from '@/libs/context'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { AdminInputSearchType } from '../type'

export function AdminFilter() {
  const { admin } = useAuth()
  const filterColumn: FilterColumn<ExVoid<AdminInputSearchType>>[] = [
    {
      field: 'search',
      type: 'text',
      placeholder: 'フリーワード検索',
      defaultValue: '',
      sx: {
        width: 320,
      },
      fieldOptions: {
        searchIcon: true,
      },
    },
  ]

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        管理者一覧
      </Typography>

      <FilterBar columns={filterColumn} createPath={!!admin?.is_super ? 'admins/create' : null} />
    </Stack>
  )
}
