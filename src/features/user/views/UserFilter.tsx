'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { UserSearchInputType } from '..'
import {
  HAS_ASSETS_OPTIONS,
  INCOME_OPTIONS,
  IS_PAID_OPTIONS,
  WILLINGNESS_OPTIONS,
} from '../options'

export function UserFilter() {
  const filterColumn: FilterColumn<ExVoid<UserSearchInputType>>[] = [
    {
      field: 'search',
      type: 'text',
      placeholder: 'フリーワード検索',
      defaultValue: '',
      sx: { width: 240 },
      fieldOptions: {
        searchIcon: true,
        hasLine: true,
      },
    },
    {
      field: 'number_of_application_from',
      type: 'text',
      placeholder: '入力',
      defaultValue: '',
      label: '申込数',
      sx: { width: 64 },
      fieldOptions: {
        groupField: true,
      },
    },
    {
      field: 'number_of_application_to',
      type: 'text',
      placeholder: '入力',
      defaultValue: '',
      sx: { width: 64 },
      fieldOptions: {
        groupField: true,
        hasTilde: true,
      },
    },
    {
      field: 'has_assets',
      type: 'select',
      placeholder: '選択',
      defaultValue: '',
      options: HAS_ASSETS_OPTIONS,
      sx: { width: 80 },
      label: 'マンション\n所有',
      fieldOptions: {
        groupField: true,
      },
    },
    {
      field: 'is_paid',
      type: 'select',
      placeholder: '選択',
      options: IS_PAID_OPTIONS,
      label: '料金プラン',
      sx: { width: 120 },
      defaultValue: '',
      fieldOptions: {
        groupField: true,
      },
    },
    {
      field: 'willing',
      type: 'select',
      placeholder: '選択',
      defaultValue: '',
      options: WILLINGNESS_OPTIONS,
      label: '購入意欲',
      sx: { width: 192 },
      fieldOptions: {
        groupField: true,
      },
    },
    {
      field: 'income',
      type: 'select',
      placeholder: '選択',
      defaultValue: '',
      label: '年収',
      options: INCOME_OPTIONS,
      sx: { width: 262 },
      fieldOptions: {
        groupField: true,
      },
    },
  ]

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        ユーザー一覧
      </Typography>

      <FilterBar columns={filterColumn} createPath="users/create" buttonSearchUnderButtonCreate />
    </Stack>
  )
}
