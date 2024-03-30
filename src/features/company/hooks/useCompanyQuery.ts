import { getCompanyList } from '@/libs/api/company'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { CompanyListType, SearchInputCompanyList } from '../type'

export function useCompanyQuery() {
  const { input, getTableData, sortOptions } = useTableContext<
    CompanyListType,
    SearchInputCompanyList
  >()

  const data = useQuery({
    queryKey: [
      'company',
      input.page,
      input.per_page,
      input.search,
      input.status,
      sortOptions?.sort_by,
      sortOptions?.column,
    ],
    queryFn: () =>
      getCompanyList({
        ...input,
        ...sortOptions,
      }),
  })

  return { tableData: getTableData(data) }
}
