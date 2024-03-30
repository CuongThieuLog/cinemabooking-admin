import {
  UserCreateInputType,
  UserListQueryInputType,
  UserListType,
  UserUpdateInputType,
} from '@/features/user'
import { QueryInputUserDetailType, UserDetailResponseType } from '@/features/user/type'
import { formatRequestDate } from '@/utils/format'
import request from '../config/axios'
import { clearObjRequest } from '../hooks'

export const getListUser = async (params: UserListQueryInputType) => {
  try {
    const response = await request.get<UserListType>('/users/list', { params })

    return response.data
  } catch (error) {
    throw error
  }
}

export const createUser = async (data: UserCreateInputType) => {
  try {
    const response = await request.post('/users/registration', {
      ...data,
      birthday: formatRequestDate(data.birthday),
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const getUser = async (id: string) => {
  try {
    const response = await request.get<UserDetailResponseType>(`/users/detail/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateUser = async (data: UserUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data
    const cleanedRequest = clearObjRequest({
      ...dataRequest,
      birthday: formatRequestDate(dataRequest.birthday),
    })

    const response = await request.put(`/users/update/${id}`, cleanedRequest)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserDetail = async ({ column, sort_by, userId }: QueryInputUserDetailType) => {
  try {
    const response = await request.get<UserDetailResponseType>(`/users/detail/${userId}`, {
      params: {
        sort_by,
        column,
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const response = await request.delete(`/users/delete/${userId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
