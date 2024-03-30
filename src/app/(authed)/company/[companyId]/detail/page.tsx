import { CompanyDetail } from '@/features/company'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <CompanyDetail />
    </TableProvider>
  )
}
