import { getCompanyUserByCompanyId } from '@/libs/api/company'
import { useQuery } from '@tanstack/react-query'

export function useCompanyUserQuery(id: unknown) {
  const { data, isLoading } = useQuery({
    queryKey: ['companyUser', id],
    queryFn: () => getCompanyUserByCompanyId(id as number),
    enabled: !!id,
  })

  const companyUserOptions = data?.map((company) => ({
    label: company.name,
    value: company.id,
  }))

  return { companyUserOptions, companyUserOptionsLoading: isLoading }
}
