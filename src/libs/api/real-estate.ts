import {
  RealEstateCreateInputType,
  RealEstateDeleteInputType,
  RealEstateDetailType,
  RealEstateListType,
  RealEstateQueryInputType,
  RealEstateUpdateInputType,
} from '@/features/real-estate/type'
import { formatRequestDate } from '@/utils/format'
import request from '../config/axios'
import { clearObjRequest } from '../hooks'

export const getRealEstates = async (params: RealEstateQueryInputType) => {
  try {
    const response = await request.get<RealEstateListType>('/properties/list', { params })

    return response.data
  } catch (error) {
    throw error
  }
}

export const getRealEstate = async (id: string) => {
  try {
    const response = await request.get<RealEstateDetailType>(`/properties/detail/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteRealEstates = async (ids: RealEstateDeleteInputType) => {
  try {
    const response = await request.post('/properties/delete', { ids })
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteRealEstate = async (id: string) => {
  try {
    const response = await request.post(`/properties/delete/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createRealEstate = async (data: RealEstateCreateInputType) => {
  try {
    const formData = new FormData()
    const keysToFormatDate = ['construction', 'lease_from', 'lease_to']
    const keysArray = ['images', 'in_charge_ids', 'traffics', 'copy_images']
    const requestData = data

    Object.entries(requestData).forEach(([key, value]) => {
      if (keysToFormatDate.includes(key)) {
        formData.append(key, String(formatRequestDate(value as string)))
      } else if (keysArray.includes(key) && Array.isArray(value)) {
        ;(value as Array<any>).forEach((item) => {
          formData.append(`${key}[]`, item instanceof Blob ? item : String(item))
        })
      } else {
        formData.append(key, String(value))
      }
    })

    const response = await request.post('/properties/registration', formData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateRealEstate = async (data: RealEstateUpdateInputType) => {
  try {
    const formData = new FormData()
    const dataRequest = clearObjRequest(data)

    const keysToFormatDate = ['construction', 'lease_from', 'lease_to']
    const keysArray = ['images', 'in_charge_ids', 'traffics', 'remove_images']

    Object.entries(dataRequest).forEach(([key, value]) => {
      if (keysToFormatDate.includes(key)) {
        formData.append(key, String(formatRequestDate(value as string)))
      } else if (keysArray.includes(key) && Array.isArray(value)) {
        ;(value as Array<any>).forEach((item) => {
          formData.append(`${key}[]`, item instanceof Blob ? item : String(item))
        })
      } else {
        formData.append(key, String(value))
      }
    })

    const response = await request.post(`/properties/update/${data.id}`, formData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getRealEstateDetail = async (id: string) => {
  try {
    const response = await request.get<RealEstateDetailType>(`/properties/detail/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}
