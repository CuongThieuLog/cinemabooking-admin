import { RealEstateListType } from '@/features/real-estate/type'
import { getRealEstates } from '@/libs/api/real-estate'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { RealEstateSearchInputType } from '../type'

export function useRealStateQuery() {
  const { input, getTableData, sortOptions } = useTableContext<
    RealEstateListType,
    RealEstateSearchInputType
  >()
  const {
    page,
    per_page,
    search,
    status,
    amount_from,
    amount_to,
    builded_year_from,
    builded_year_to,
    occupation_area_from,
    occupation_area_to,
  } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: [
      'real-state',
      page,
      per_page,
      search,
      sort_by,
      column,
      status,
      amount_from,
      amount_to,
      builded_year_from,
      builded_year_to,
      occupation_area_from,
      occupation_area_to,
    ],
    queryFn: () =>
      getRealEstates({
        ...input,
        ...sortOptions,
      }),
  })

  return {
    tableData: getTableData(data),
  }
}
