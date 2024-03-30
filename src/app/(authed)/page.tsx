import { RealEstateFilter, RealEstateList } from '@/features/real-estate'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <RealEstateFilter />
      <RealEstateList />
    </TableProvider>
  )
}
