import { getUserDetail } from '@/libs/api/user'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { QueryInputUserDetailType, UserDetailResponseType } from '../type'

export const useUserDetailQuery = (userId: string) => {
  const { sortOptions } = useTableContext<UserDetailResponseType, QueryInputUserDetailType>()

  const { data, error, isLoading } = useQuery({
    queryKey: ['user', userId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getUserDetail({ userId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
