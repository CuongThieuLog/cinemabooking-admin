import { LayoutAuth } from '@/libs/components/Layout'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '物件一覧',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutAuth>{children}</LayoutAuth>
}
