'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { CompanyInputType } from '..'
import { COMPANY_STATUS_OPTIONS } from '../options'

export function CompanyFilter() {
  const filterColumn: FilterColumn<ExVoid<CompanyInputType>>[] = [
    {
      field: 'search',
      type: 'text',
      placeholder: 'フリーワード検索',
      sx: {
        width: 280,
      },
      defaultValue: '',
      fieldOptions: {
        searchIcon: true,
        hasLine: true,
      },
    },
    {
      field: 'status',
      type: 'select',
      placeholder: '選択',
      defaultValue: '',
      options: COMPANY_STATUS_OPTIONS,
      label: 'ステータス',
      sx: { width: 104 },
    },
  ]

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        不動産会社一覧
      </Typography>

      <FilterBar columns={filterColumn} createPath="company/create" />
    </Stack>
  )
}
