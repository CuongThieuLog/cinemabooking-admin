import { listAdmin } from '@/libs/api/admin'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { AdminInputSearchType, AdminListType } from '../type'

export function useAdminQuery() {
  const { input, getTableData, sortOptions } = useTableContext<
    AdminListType,
    AdminInputSearchType
  >()
  const { page, per_page, search } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['admin', page, per_page, search, sort_by, column],
    queryFn: () => listAdmin({ page, per_page, search, sort_by, column }),
  })

  return {
    tableData: getTableData(data),
  }
}
