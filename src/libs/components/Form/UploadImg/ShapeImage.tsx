import { CustomImage } from '@/features/real-estate/styled'
import { Box, IconButton, styled } from '@mui/material'
import CloseIcon from 'public/assets/svgs/close.svg'
import { ImageResponseType } from './UploadImage'

type ShapeImageProps = {
  onDelete: (path: ImageResponseType | File) => void
  path: File | ImageResponseType
}

const ShapeImage: React.FC<ShapeImageProps> = ({ onDelete, path }) => {
  const objectUrl = path instanceof File ? URL.createObjectURL(path) : path.file_path

  return (
    <BoxImage>
      <CloseButton onClick={() => onDelete(path)}>
        <CloseIcon />
      </CloseButton>

      <CustomImage src={objectUrl} alt="image" width={160} height={160} />
    </BoxImage>
  )
}

export { ShapeImage }

const BoxImage = styled(Box)({
  position: 'relative',
  width: 160,
  height: 160,
})

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: -10,
  right: -10,
  background: theme.palette.base.primary,
  color: theme.palette.base.black,
  padding: 2,
  '&:hover': {
    background: theme.palette.base.primary,
  },
}))
