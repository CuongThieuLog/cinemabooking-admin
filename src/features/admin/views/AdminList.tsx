'use client'

import { ReactTable } from '@/libs/components/Table'
import { useAuth } from '@/libs/context'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import EditIcon from 'public/assets/svgs/edit.svg'
import { useAdminQuery } from '../hooks/useQueryListAdmin'
import { AdminListType } from '../type'

const AdminList = () => {
  const router = useRouter()
  const { tableData } = useAdminQuery()
  const { admin } = useAuth()

  const columns: ColumnDef<AdminListType>[] = [
    {
      header: '管理者ID',
      accessorKey: 'id',
      meta: {
        width: 76,
        headStyle: {
          paddingLeft: '4px',
        },
        cellStyle: {
          fontSize: '14px',
          lineHeight: '20px',
          textAlign: 'center',
        },
      },
    },
    {
      id: 'name',
      header: '名前',
      accessorKey: 'name',
      meta: {
        width: 200,
        cellStyle: {
          fontSize: '14px',
          lineHeight: '20px',
        },
      },
    },
    {
      id: 'email',
      header: 'メールアドレス',
      accessorKey: 'email',
      meta: {
        cellStyle: {
          fontSize: '14px',
          lineHeight: '20px',
        },
      },
    },
  ]

  return (
    <ReactTable
      {...tableData}
      columns={columns}
      action={{
        detailIcon: <EditIcon />,
        disabledDetail: !admin?.is_super,
        onDetail: (id) => {
          router.push(`/admins/${id}`)
        },
      }}
      selection={!!admin?.is_super}
    />
  )
}

export { AdminList }
