import { convertStatusData } from '@/features/article'
import {
  ArticleCreateInputType,
  ArticleDetailType,
  ArticleListType,
  ArticleUpdateInputType,
  QueryInputListArticle,
} from '@/features/article/type'
import { formatRequestDate } from '@/utils/format'
import request from '../config/axios'

export const getListArticles = async (params: QueryInputListArticle) => {
  try {
    const response = await request.get<ArticleListType>('/articles/list', {
      params,
    })

    return response.data
  } catch (err) {
    throw err
  }
}

export const createArticle = async (data: ArticleCreateInputType) => {
  try {
    const response = await request.post('/articles/registration', data)

    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteArticle = async ({ id }: { id: string }) => {
  try {
    const response = await request.delete(`/articles/delete/${id}`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const updateArticle = async (data: ArticleUpdateInputType) => {
  try {
    const { id, publish_start, publish_end, ...dataRequest } = data
    const response = await request.put(`/articles/update/${id}`, {
      ...dataRequest,
      publish_start: formatRequestDate(publish_start),
      publish_end: formatRequestDate(publish_end),
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const getArticle = async (id: string) => {
  try {
    const response = await request.get<ArticleDetailType>(`/articles/detail/${id}`)

    return {
      data: { ...response.data.data, status: convertStatusData(response.data.data.status) },
    }
  } catch (error) {
    throw error
  }
}
