import { StatusColorType } from '@/libs/components/StatusTag'
import { IsPublishType, RealEstateStatus } from '..'
import { ROOM_TYPE_OPTIONS, STRUCTURE_OPTIONS } from '../utils/consts'

const convertStatus = (
  status: RealEstateStatus,
  width: string,
): {
  text: string
  width?: string
  color: StatusColorType
} => {
  switch (status) {
    case 1:
      return {
        text: '公開中',
        color: 'green',
        width,
      }
    case 2:
      return {
        text: '下書き',
        color: 'yellow',
        width,
      }
    case 3:
      return {
        text: '審査受付停止中',
        color: 'red',
        width,
      }
    case 4:
      return {
        text: '成約済み',
        color: 'grey',
        width,
      }
  }
}

const convertIsPublish = (
  isPublish: IsPublishType,
  width: string,
): {
  text: string
  color: StatusColorType
  width?: string
} => {
  switch (isPublish) {
    case 0:
      return {
        text: '下書き保存',
        color: 'yellow',
        width,
      }
    case 1:
      return {
        text: '公開する',
        color: 'grey',
        width,
      }
  }
}

export const convertRealEstateStatus = (status: RealEstateStatus) => convertStatus(status, '80px')

export const convertRealEstateIsPublish = (isPublish: IsPublishType) =>
  convertIsPublish(isPublish, '96px')

export const convertRoomTypeText = (roomType?: unknown) => {
  return roomType ? ROOM_TYPE_OPTIONS[Number(roomType) - 1].label : '-'
}

export const convertStructureText = (structure?: unknown) => {
  return structure ? STRUCTURE_OPTIONS[Number(structure) - 1].label : '-'
}
