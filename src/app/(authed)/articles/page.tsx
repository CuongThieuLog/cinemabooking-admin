import { ArticleFilter, ArticleList } from '@/features/article'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <ArticleFilter />
      <ArticleList />
    </TableProvider>
  )
}
