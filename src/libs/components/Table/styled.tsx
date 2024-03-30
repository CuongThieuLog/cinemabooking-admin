import {
  Button,
  IconButton,
  PaginationItem as MuiPaginationItem,
  TableCell as MuiTableCell,
  styled,
} from '@mui/material'

const ButtonPagination = styled(Button)(({ theme }) => ({
  background: theme.palette.base.white + '!important',
  '&.MuiPaginationItem-root': {
    padding: 8,
    borderRadius: 6,
    border: `1px solid ${theme.palette.mono[200]}`,
    backgroundColor: theme.palette.base.white,
  },
}))

const ButtonAction = styled(IconButton)({
  padding: 0,
  '&:hover': {
    background: 'transparent',
  },
})

const PaginationItem = styled(MuiPaginationItem)(({ theme }) => ({
  border: 'none',
  width: 24,
  height: 32,
  padding: '6px 8px',
  minWidth: 24,
  margin: '0 2px',
  borderRadius: '6px',
  '&.Mui-selected': {
    border: 'none',
    backgroundColor: theme.palette.base.primary_pale,
    color: theme.palette.base.primary,
  },
  '&.MuiPaginationItem-previousNext': {
    minWidth: 32,
    border: `1px solid ${theme.palette.mono[200]}`,
    padding: '8px',
    margin: '0 6px',
  },
}))

const ButtonRed = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.status.error,
  color: theme.palette.status.error,
  height: 40,
  fontSize: '14px',
  lineHeight: '14px',
  width: 80,
  '&:hover': {
    borderColor: theme.palette.status.error,
  },
  '&:focus': {
    borderColor: theme.palette.status.error,
  },
}))

const ButtonCreate = styled(Button)(({ theme }) => ({
  background: theme.palette.base.primary,
  borderColor: theme.palette.base.primary,
  color: theme.palette.base.white,
  width: 80,
  height: 40,
  padding: 0,
  fontSize: '14px',
  '&:hover': {
    background: theme.palette.base.primary,
    borderColor: theme.palette.base.primary,
  },
  '&:focus': {
    background: theme.palette.base.primary,
    borderColor: theme.palette.base.primary,
  },
}))

const TableCell = styled(MuiTableCell)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  textAlign: 'center',
}))

const ButtonSearch = styled(ButtonRed)({
  marginLeft: 16,
})

const ButtonActionTable = styled(Button)(({ theme }) => ({
  width: 120,
  height: 48,
  padding: 0,
}))

export {
  ButtonAction,
  ButtonActionTable,
  ButtonCreate,
  ButtonPagination,
  ButtonRed,
  ButtonSearch,
  PaginationItem,
  TableCell,
}
