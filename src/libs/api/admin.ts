import {
  AdminCreateInputType,
  AdminListType,
  AdminUpdateInputType,
  QueryInputListAdmin,
} from '@/features/admin'
import { AdminResponseType } from '@/features/auth'
import request from '../config/axios'
import { clearObjRequest } from '../hooks'

export const listAdmin = async (params: QueryInputListAdmin) => {
  try {
    const response = await request.get<AdminListType>('/list', {
      params,
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const createAdmin = async (data: AdminCreateInputType) => {
  try {
    const response = await request.post(`/registration`, data)

    return response
  } catch (error) {
    throw error
  }
}

export const deleteAdmins = async (ids: string[]) => {
  try {
    const response = await request.post('/delete', {
      ids,
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const updateAdmin = async (data: AdminUpdateInputType) => {
  try {
    const { id, ...dataUpdate } = data
    const adminData = clearObjRequest(dataUpdate)

    const response = await request.put(`/update/${id}`, adminData)

    return response
  } catch (error) {
    throw error
  }
}

export const getAdmin = async (id: string) => {
  try {
    const response = await request.get<AdminResponseType>(`/show/${id}`)

    return response.data.data
  } catch (error) {
    throw error
  }
}
