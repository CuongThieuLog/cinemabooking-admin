import { getCompanies } from '@/libs/api/company'
import { useQuery } from '@tanstack/react-query'

export function useCompaniesQuery() {
  const { data, isFetching } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  })

  const companyOptions =
    data?.map((company) => ({
      label: company.name,
      value: company.id,
    })) || []

  return { companyOptions, companiesOptionsLoading: isFetching }
}
