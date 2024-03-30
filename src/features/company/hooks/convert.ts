import { StatusColorType } from '@/libs/components/StatusTag'
import { CompanyStatusType } from '..'

export const convertStatusListValue = (
  status: CompanyStatusType,
): {
  text: string
  color: StatusColorType
} => {
  switch (status) {
    case 1:
      return {
        text: '利用中',
        color: 'green',
      }
    case 2:
      return {
        text: '利用停止',
        color: 'red',
      }
    case 3:
      return {
        text: '退会',
        color: 'grey',
      }
  }
}
