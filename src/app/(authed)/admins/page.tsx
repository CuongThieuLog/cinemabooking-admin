import { AdminFilter, AdminList } from '@/features/admin'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <AdminFilter />
      <AdminList />
    </TableProvider>
  )
}
