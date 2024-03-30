'use client'

import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import CopyIcon from 'public/assets/svgs/copy.svg'
import DeleteIcon from 'public/assets/svgs/delete.svg'
import EditIcon from 'public/assets/svgs/edit.svg'
import { BreadcrumbType, Breadcrumbs } from '../../BreadCrumbs'
import { ButtonAction } from './styled'

interface HeaderProps {
  title: string
  editPath?: string
  copyPath?: string
  deleteFunction?: () => void
  isPending?: boolean
  pathArrCustom?: BreadcrumbType[]
  hiddenBreadcrumb?: boolean
}

const Header = (props: HeaderProps) => {
  const router = useRouter()
  const { title, editPath, deleteFunction, isPending, pathArrCustom, hiddenBreadcrumb, copyPath } =
    props

  if (hiddenBreadcrumb)
    return (
      <Typography variant="h2" color="grey.600">
        {title}
      </Typography>
    )

  if (hiddenBreadcrumb) return <Typography variant="h2">{title}</Typography>

  return (
    <Stack spacing={3}>
      <Typography variant="h2" color="grey.600">
        {title}
      </Typography>

      <Stack direction="row" justifyContent="space-between">
        <Breadcrumbs pathArrCustom={pathArrCustom} />

        <Stack direction="row" spacing={1}>
          {copyPath && (
            <ButtonAction
              variant="outlined"
              startIcon={<CopyIcon />}
              onClick={() => router.push(copyPath)}
              disabled={isPending}
            >
              複製
            </ButtonAction>
          )}

          {editPath && (
            <ButtonAction
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => router.push(editPath)}
              disabled={isPending}
            >
              編集
            </ButtonAction>
          )}

          {deleteFunction && (
            <ButtonAction
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={deleteFunction}
              disabled={isPending}
            >
              削除
            </ButtonAction>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export { Header }
