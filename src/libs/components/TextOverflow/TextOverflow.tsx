import { Tooltip, Typography, TypographyProps, styled } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

type TextOverflowProps<T extends TypographyProps> = T & {
  children: unknown
}

function TextOverflow<T extends TypographyProps>({ children, ...props }: TextOverflowProps<T>) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [isTextEllipsis, setTextEllipsis] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (element) {
      setTextEllipsis(element.scrollWidth > element.clientWidth)
    }
  }, [children])

  return (
    <Tooltip title={children} disableHoverListener={!isTextEllipsis} arrow>
      <TypographyWithTextOverflow
        ref={ref}
        {...props}
        sx={{ cursor: !isTextEllipsis ? 'text' : 'pointer' }}
      >
        {children}
      </TypographyWithTextOverflow>
    </Tooltip>
  )
}

export { TextOverflow }

const TypographyWithTextOverflow = styled(Typography)({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
})
