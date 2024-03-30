export type MenuType = {
  title: string
  icon: string
  href: string
  active_icon: string
  disabled?: boolean
  subHref?: string
}

export const menus: MenuType[] = [
  {
    href: '/',
    title: '物件一覧',
    subHref: 'real-estate',
    icon: '/assets/svgs/property.svg',
    active_icon: '/assets/svgs/property_active.svg',
  },
  {
    href: '/users',
    title: 'ユーザー一覧',
    icon: '/assets/svgs/user.svg',
    active_icon: '/assets/svgs/user_active.svg',
  },
  {
    href: '/transactions',
    title: '取引一覧',
    icon: '/assets/svgs/transaction.svg',
    active_icon: '/assets/svgs/transaction_active.svg',
  },
  {
    href: '/company',
    title: '不動産会社一覧',
    icon: '/assets/svgs/company.svg',
    active_icon: '/assets/svgs/company_active.svg',
  },
  {
    href: '/articles',
    title: 'コンテンツ一覧',
    icon: '/assets/svgs/article.svg',
    active_icon: '/assets/svgs/article_active.svg',
  },
  {
    href: '/admins',
    title: '管理者一覧',
    icon: '/assets/svgs/admin.svg',
    active_icon: '/assets/svgs/admin_active.svg',
  },
]
