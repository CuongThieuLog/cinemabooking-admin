import { base } from '@/libs/config/theme'
import { useAuth } from '@/libs/context'
import { IconButton, List, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AccountIcon from 'public/assets/svgs/account.svg'
import AccountActiveIcon from 'public/assets/svgs/account_active.svg'
import LogoutIcon from 'public/assets/svgs/logout.svg'
import { useState } from 'react'
import { Modal } from '../../Modal'
import { ListItemButton } from './ItemSidebar'
import { menus } from './menu'

export const SIDE_BAR_WIDTH = 240

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const { admin, loading, handleLogout } = useAuth()
  const pathName = usePathname()
  const selfInfoActive = pathName.includes('self-info')

  return (
    <Stack
      sx={{
        position: 'fixed',
        width: SIDE_BAR_WIDTH,
        height: '100%',
        background: base.white,
        alignItems: 'center',
        pt: 3.5,
      }}
    >
      <Stack
        width={68}
        height={120}
        color="base.primary"
        gap={2}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2">ロゴ</Typography>

        <Stack
          width={68}
          height={26}
          bgcolor="base.primary_pale"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="subtitle1" lineHeight="18px">
            管理画面
          </Typography>
        </Stack>
      </Stack>

      <List
        sx={{
          px: 1,
          mt: 6,
          py: '2px',
          width: '100%',
          bgcolor: 'background.white',
        }}
        component="nav"
      >
        {menus.map((menu) => (
          <ListItemButton key={menu.title} menu={menu} />
        ))}
      </List>

      <Stack
        left={0}
        pb="4px"
        right={0}
        gap="26px"
        bottom={0}
        height={151}
        alignItems="center"
        position="absolute"
        bgcolor="base.primary"
        justifyContent="center"
      >
        <Stack direction="row" gap="18px">
          <Stack
            gap={1}
            direction="row"
            alignItems="center"
            component={Link}
            href="/self-info"
            sx={{ textDecoration: 'none' }}
            width={176}
            height={60}
            bgcolor={selfInfoActive ? base.primary_pale : 'transparent'}
            borderRadius="12px"
            padding="14px 10px 14px 14px"
          >
            {selfInfoActive ? <AccountActiveIcon /> : <AccountIcon />}

            <Typography
              variant="subtitle1"
              lineHeight="15px"
              color={selfInfoActive ? 'base.black' : 'base.white'}
              width="112px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              fontWeight={400}
            >
              {admin?.name}
            </Typography>
          </Stack>

          <IconButton sx={{ padding: 0 }} onClick={handleOpenModal}>
            <LogoutIcon />
          </IconButton>
        </Stack>
        <Typography fontSize={9} lineHeight="11px" fontWeight={500} color="base.white">
          ©︎ xxxx All Rights Reserved.
        </Typography>
      </Stack>

      <Modal
        open={open}
        title="ログアウト"
        textSubmit="ログアウトする"
        handleSubmit={handleLogout}
        handleCloseModal={handleCloseModal}
        description="ログアウトしてよろしいですか？"
        isLoading={loading}
      />
    </Stack>
  )
}

export { Sidebar }
