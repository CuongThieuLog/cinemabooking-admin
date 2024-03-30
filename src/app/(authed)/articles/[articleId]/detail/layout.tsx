import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'コンテンツ詳細',
}

export default function Page({ children }: { children: React.ReactNode }) {
  return children
}
