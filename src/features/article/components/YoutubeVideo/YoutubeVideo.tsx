import { Box, FormHelperText } from '@mui/material'
import React from 'react'
import { FieldError } from 'react-hook-form'
import { ZodError } from 'zod'
import { YoutubeUrlSchema } from '../..'

interface YoutubeVideoProps {
  youtubeUrl: string | undefined
  errMessage?: FieldError | undefined
}

const YoutubeErrorMessage: React.FC<{ error: ZodError<string> }> = ({ error }) => {
  const parsedMessage = JSON.parse(error.message)[0].message

  return (
    <Box sx={{ marginLeft: '128px !important', mt: 0 }}>
      <FormHelperText error sx={{ marginTop: 0 }}>
        {parsedMessage}
      </FormHelperText>
    </Box>
  )
}

const YoutubeIframe: React.FC<{ youtubeId: string }> = ({ youtubeId }) => (
  <iframe
    width="288"
    height="162"
    src={`https://www.youtube.com/embed/${youtubeId}`}
    allowFullScreen
    style={{ border: 'none', marginLeft: 128 }}
  />
)

const YoutubeVideo: React.FC<YoutubeVideoProps> = ({ youtubeUrl, errMessage }) => {
  if (!youtubeUrl) return
  if (errMessage) return

  const result = YoutubeUrlSchema.safeParse(youtubeUrl)

  return result.success ? (
    <YoutubeIframe youtubeId={result.data} />
  ) : (
    <YoutubeErrorMessage error={result.error} />
  )
}

export { YoutubeVideo }
