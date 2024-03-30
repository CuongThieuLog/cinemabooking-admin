import { StatusColorType, StatusTag } from '@/libs/components/StatusTag'
import { Skeleton, Stack, SxProps, Typography } from '@mui/material'
import { convertUrlYoutube } from '../../hooks/convertUrlYoutube'

type DetailItemProps = {
  label: string
  value?: string | number | []
  youtube?: {
    url: string
  }
  status?: {
    text: string
    color: StatusColorType
    width?: string
  }
  isPending?: boolean
  sx?: SxProps
}

const YoutubeContent = ({ value }: { value: string }) => (
  <iframe
    width="288"
    height="162"
    src={`https://www.youtube.com/embed/${convertUrlYoutube(value)}`}
    style={{ border: 'none' }}
  />
)

const DefaultContent = ({ value, sx }: { value: string | number | []; sx?: SxProps }) => {
  if (Array.isArray(value)) {
    return (
      <Stack direction="row" width={800} flexWrap="wrap" gap={1}>
        {value.map((item, index) => (
          <Typography
            color="grey.600"
            variant="body2"
            fontWeight={400}
            whiteSpace="pre-line"
            sx={sx}
            key={index}
          >
            {item}
          </Typography>
        ))}
      </Stack>
    )
  }

  return (
    <Typography
      color="grey.600"
      variant="body2"
      fontWeight={400}
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="pre-line"
      sx={sx}
    >
      {value}
    </Typography>
  )
}

const DetailItem = (props: DetailItemProps) => {
  const { label, value, youtube, status, isPending, sx } = props

  return (
    <Stack spacing={1} direction="row" alignItems={youtube ? 'flex-start' : 'center'}>
      <Stack
        minHeight={44}
        minWidth={120}
        padding="4px 8px"
        bgcolor="base.white"
        justifyContent="center"
        height={youtube ? 44 : '100%'}
      >
        <Typography variant="body2" color="grey.500">
          {label}
        </Typography>
      </Stack>

      {isPending ? (
        <Skeleton variant="text" width={336} height={44} />
      ) : (
        <Stack minWidth={320} height="100%" justifyContent="center">
          {youtube && <YoutubeContent value={youtube.url} />}

          {status && <StatusTag color={status.color} text={status.text} width={status.width} />}

          {value && <DefaultContent value={value} sx={sx} />}
        </Stack>
      )}
    </Stack>
  )
}

export { DetailItem }
