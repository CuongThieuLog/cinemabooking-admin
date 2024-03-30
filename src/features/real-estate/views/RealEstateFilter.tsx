'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { RealEstateSearchInputType } from '..'
import { REAL_ESTATE_STATUS_OPTIONS } from '../utils/consts'

export function RealEstateFilter() {
  const filterColumn: FilterColumn<ExVoid<RealEstateSearchInputType>>[] = [
    {
      field: 'search',
      type: 'text',
      placeholder: 'フリーワード検索',
      defaultValue: '',
      sx: { width: 200 },
      fieldOptions: {
        searchIcon: true,
        hasLine: true,
      },
    },
    {
      field: 'amount_from',
      type: 'text',
      placeholder: '入力',
      defaultValue: '',
      label: '価格',
      sx: { width: 120 },
      fieldOptions: {
        groupField: true,
      },
    },
    {
      field: 'amount_to',
      type: 'text',
      placeholder: '入力',
      defaultValue: '',
      sx: { width: 120 },
      fieldOptions: {
        groupField: true,
        hasTilde: true,
      },
    },
    {
      field: 'status',
      type: 'select',
      placeholder: '選択',
      options: REAL_ESTATE_STATUS_OPTIONS,
      label: 'ステータス',
      sx: { width: 160 },
      defaultValue: '',
      fieldOptions: {
        groupField: true,
      },
    },
    {
      field: 'builded_year_from',
      type: 'text',
      placeholder: '入力',
      defaultValue: '',
      label: '築年数',
      sx: { width: 80 },
      fieldOptions: {
        groupField: true,
      },
    },
    {
      field: 'builded_year_to',
      type: 'text',
      placeholder: '入力',
      defaultValue: '',
      sx: { width: 80 },
      fieldOptions: {
        groupField: true,
        hasTilde: true,
      },
    },
    {
      field: 'occupation_area_from',
      type: 'text',
      placeholder: '入力',
      defaultValue: '',
      label: '平米数',
      sx: { width: 120 },
      fieldOptions: {
        groupField: true,
      },
    },
    {
      field: 'occupation_area_to',
      type: 'text',
      placeholder: '入力',
      defaultValue: '',
      sx: { width: 120 },
      fieldOptions: {
        groupField: true,
        hasTilde: true,
      },
    },
  ]

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        物件一覧
      </Typography>

      <FilterBar
        columns={filterColumn}
        createPath="real-estate/create"
        buttonSearchUnderButtonCreate
      />
    </Stack>
  )
}
