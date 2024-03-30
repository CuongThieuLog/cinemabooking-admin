import { getCompany } from '@/libs/api/company'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { CompanyInputType, CompanyResponseType } from '..'

export function useCompanyDetailQuery(id: string) {
  const { sortOptions } = useTableContext<CompanyResponseType, CompanyInputType>()

  const { data, isLoading } = useQuery({
    queryKey: ['company', sortOptions?.sort_by, sortOptions?.column, id],
    queryFn: () =>
      getCompany({
        id,
        ...sortOptions,
      }),
    enabled: !!id,
  })

  return {
    data,
    isLoading,
  }
}
