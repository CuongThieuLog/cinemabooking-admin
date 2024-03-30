import { Box, Button, styled } from '@mui/material'

const BoxContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  minHeight: 230,
  boxShadow: theme.shadows[1],
  borderRadius: 16,
  padding: '48px 16px 24px 16px',
  background: theme.palette.base.white,
}))

const ButtonModal = styled(Button)({
  width: 240,
})

const ButtonConfirm = styled(ButtonModal)(({ theme }) => ({
  backgroundColor: theme.palette.status.error,
  '&:hover': {
    backgroundColor: theme.palette.status.error,
  },
  '&:focus': {
    backgroundColor: theme.palette.status.error,
  },
}))

export { BoxContainer, ButtonConfirm, ButtonModal }
