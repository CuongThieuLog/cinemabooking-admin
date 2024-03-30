import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'マイページ',
}

export default function Page({ children }: { children: React.ReactNode }) {
  return children
}
