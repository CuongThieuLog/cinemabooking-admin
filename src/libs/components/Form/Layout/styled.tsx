import { Button, styled } from '@mui/material'

const ButtonAction = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.base.primary,
  color: theme.palette.base.primary,
  '&:hover': {
    borderColor: theme.palette.base.primary,
  },
  '&:focus': {
    borderColor: theme.palette.base.primary,
  },
  height: 40,
  width: 80,
  padding: 0,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '14px',
}))

export { ButtonAction }
