import { statusColors } from '@/libs/config/theme'
import { Stack, Typography } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { DEFAULT_DROPZONE_WIDTH, Dropzone } from './Dropzone'
import { ShapeImage } from './ShapeImage'

type UploadFileProps<F extends FieldValues> = UseControllerProps<F> &
  Omit<UseControllerProps<F>, 'defaultValue'> & {
    multiple?: boolean
    disabled?: boolean
    onDeleteImage?: (id: string) => void
    onAddImage?: (file: File[]) => void
    loading?: boolean
  }

export type ImageResponseType = {
  file_path: string
  id: string
}

export const UploadImage = <F extends FieldValues>({
  control,
  name,
  multiple = true,
  onDeleteImage,
  onAddImage,
}: UploadFileProps<F>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control })
  const [errorState, setError] = useState<string[]>([])

  const onDrop = (_acceptedFiles: File[]) => {
    const data = multiple ? _acceptedFiles.map((file) => file) : _acceptedFiles[0]

    if (onAddImage) {
      onAddImage(_acceptedFiles)
    }
    if (multiple) onChange([...(value || []), ...(data as File[])])
    else onChange(data)
    setError([])
  }

  const onDelete = useCallback(
    (path: ImageResponseType | File) => {
      if ('id' in path && 'file_path' in path) {
        const data = value as ImageResponseType[]
        const newData = data.filter((item) => item.id !== path.id)

        onChange(newData)
        if (onDeleteImage) {
          onDeleteImage(path.id)
        }
      } else {
        const data = value as File[]
        const newData = data.filter((item) => item !== path)
        onChange(newData)
      }
    },
    [onChange, value, onDeleteImage],
  )

  const onReject = (files: FileRejection[]) => {
    const dataErr: string[] = []
    files.forEach((file) =>
      file.errors.forEach((err) => {
        dataErr.push(err.message)
      }),
    )
    setError(dataErr)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    multiple,
    onDropRejected: onReject,
  })

  const previews = useMemo(() => {
    if (multiple) {
      const files = value as (ImageResponseType | File)[]

      return (
        files && files.map((file, key) => <ShapeImage key={key} path={file} onDelete={onDelete} />)
      )
    }
    return []
  }, [multiple, value, onDelete])

  const haveImage = value && (value as string[]).length > 0

  return haveImage ? (
    <Stack spacing={1}>
      <Stack direction="row" gap={2} width={928} flexWrap="wrap">
        {previews}

        <Dropzone getInputProps={getInputProps} getRootProps={getRootProps} haveImage />
      </Stack>

      {errorState &&
        errorState.map((err, idx) => (
          <Typography key={idx} variant="subtitle1" color={statusColors.error}>
            {err}
          </Typography>
        ))}

      {error && (
        <Typography variant="subtitle1" color={statusColors.error}>
          {error.message as string}
        </Typography>
      )}
    </Stack>
  ) : (
    <Stack spacing={1} width={DEFAULT_DROPZONE_WIDTH}>
      <Dropzone getInputProps={getInputProps} getRootProps={getRootProps} />

      {error && (
        <Typography variant="subtitle1" color={statusColors.error} textAlign="center">
          {error.message as string}
        </Typography>
      )}
    </Stack>
  )
}
