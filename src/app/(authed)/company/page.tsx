import { CompanyFilter, CompanyList } from '@/features/company'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <CompanyFilter />
      <CompanyList />
    </TableProvider>
  )
}
