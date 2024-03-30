import { SelectOption } from '@/libs/components/Form/Select/SelectStatus'

export const ROOM_TYPE_OPTIONS = [
  { label: '1R', value: '1' },
  { label: '1K', value: '2' },
  { label: '1DK', value: '3' },
  { label: '1LDK', value: '4' },
  { label: '2K', value: '5' },
  { label: '2DK', value: '6' },
  { label: '2LDK', value: '7' },
  { label: '3K', value: '8' },
  { label: '3DK', value: '9' },
  { label: '3LDK', value: '10' },
  { label: '4K', value: '11' },
  { label: '4DK', value: '12' },
  { label: '4LDK', value: '13' },
  { label: '5DK以上', value: '14' },
]

export const STRUCTURE_OPTIONS = [
  {
    label: 'SRC造',
    value: '1',
  },
  {
    label: 'RC造',
    value: '2',
  },
  {
    label: '鉄骨造',
    value: '3',
  },
  {
    label: '軽量鉄骨造',
    value: '4',
  },
  {
    label: '木造',
    value: '5',
  },
  {
    label: 'その他',
    value: '6',
  },
]

export const REAL_ESTATE_PUBLISH_OPTIONS: SelectOption[] = [
  { label: '下書き保存 ', value: 0, color: 'yellow' },
  { label: '公開する', value: 1, color: 'grey' },
]

export const ANNOUNCEMENT_OPTIONS = [
  { label: 'あり', value: 1 },
  { label: 'なし', value: 0 },
]

export const SUBLEASE_OPTIONS = [
  { label: '解除', value: 0 },
  { label: '継承', value: 1 },
]

export const REAL_ESTATE_STATUS_OPTIONS = [
  { label: '公開中', value: 1 },
  { label: '下書き ', value: 2 },
  { label: '審査受付停止中', value: 3 },
  { label: '成約済み', value: 4 },
]
