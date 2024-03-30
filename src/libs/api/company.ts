import {
  CompanyCreateInputType,
  CompanyListType,
  CompanyResponseType,
  CompanySelectType,
  CompanyUpdateInputType,
  CompanyUserCreateInputType,
  CompanyUserListType,
  CompanyUserResponseType,
  DeletePropCompany,
  QueryInputCompanyDetail,
  SearchInputCompanyList,
} from '@/features/company'
import request from '../config/axios'
import { clearObjRequest } from '../hooks'

export const createCompany = async (data: CompanyCreateInputType) => {
  try {
    const response = await request.post('/company/registration', data)

    return response
  } catch (error) {
    throw error
  }
}

export const getCompany = async ({ id, column, sort_by }: QueryInputCompanyDetail) => {
  try {
    const response = await request.get<CompanyResponseType>(`/company/detail/${id}`, {
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

export const deleteCompany = async ({ id }: DeletePropCompany) => {
  try {
    const response = await request.delete(`/company/delete/${id}`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const updateCompany = async (data: CompanyUpdateInputType) => {
  try {
    const { id, ...dataUpdate } = data
    const response = await request.put(`/company/update/${id}`, dataUpdate)

    return response
  } catch (error) {
    throw error
  }
}

export const getCompanyList = async (params: SearchInputCompanyList) => {
  try {
    const response = await request.get<CompanyListType>('/company/list', {
      params,
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const createCompanyUser = async (data: CompanyUserCreateInputType) => {
  try {
    const { id: companyId, ...company } = data
    const response = await request.post(`/company/${companyId}/user/registration`, company)

    return response
  } catch (error) {
    throw error
  }
}

export const updateCompanyUser = async (data: CompanyUserCreateInputType) => {
  try {
    const { id: companyUserId, ...company } = data
    const companyUserData = clearObjRequest(company)

    const response = await request.put(`/company/user/update/${companyUserId}`, companyUserData)

    return response
  } catch (error) {
    throw error
  }
}

export const getCompanyUser = async (id: string) => {
  try {
    const response = await request.get<CompanyUserResponseType>(`/company/user/${id}`)

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteCompanyUser = async ({ id }: { id: string }) => {
  try {
    const response = await request.delete(`/company/user/delete/${id}`)

    return response
  } catch (error) {
    throw error
  }
}

export const getCompanies = async () => {
  try {
    const response = await request.get<CompanySelectType>('/company/getAll')
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const getCompanyUserByCompanyId = async (id: number) => {
  try {
    const response = await request.get<CompanyUserListType>(`/company/${id}/getUsers`)
    return response.data.data
  } catch (error) {
    throw error
  }
}
