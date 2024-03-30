import { styled } from '@mui/material'

const CustomImage = styled('img')(({ theme }) => ({
  border: `1px solid ${theme.palette.base.separate_contents}`,
  width: 160,
  height: 160,
  borderRadius: 4,
  objectFit: 'contain',
}))

export { CustomImage }
