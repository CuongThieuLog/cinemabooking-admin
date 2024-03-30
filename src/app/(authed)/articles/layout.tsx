import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'コンテンツ一覧',
}

export default function Page({ children }: { children: React.ReactNode }) {
  return children
}
