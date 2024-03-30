import { mono } from '@/libs/config/theme'
import { OutlinedInputProps, styled } from '@mui/material'
import { FieldValues, useController } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { BaseInputProps } from '.'
import { InputControl } from './InputControl'

type InputProps<T extends FieldValues> = BaseInputProps<T> &
  OutlinedInputProps & {
    scaleFormat?: number
  }

function InputNumber<T extends FieldValues>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  labelRight,
  helperText,
  controlProps,
  width = '100%',
  padding,
  required,
  labelLeft,
  labelHeight,
  scaleFormat = 0,
  ...props
}: InputProps<T>) {
  const {
    field: { ref, value, onChange, ...inputProps },
    fieldState: { error },
  } = useController({ name, control, defaultValue })

  return (
    <InputControl
      fieldError={error}
      fullWidth={fullWidth}
      label={label}
      required={required}
      labelLeft={labelLeft}
      helperText={helperText}
      labelRight={labelRight}
      labelHeight={labelHeight}
      {...controlProps}
    >
      <InputStyled
        inputRef={ref}
        value={String(value)}
        sx={{ width: width }}
        placeholder={props.placeholder}
        mask={[
          {
            mask: Number,
            scale: scaleFormat,
            padFractionalZeros: false,
            normalizeZeros: false,
            radix: '.',
            mapToRadix: ['.'],
          },
          {
            mask: /^=[0-9a-zA-Z+!%^o*()+\-\./]{0,999}$/i,
          },
        ]}
        onAccept={(_value, imark) => {
          onChange(imark.value)
        }}
        style={props?.inputProps?.style || {}}
        autoComplete="off"
        {...inputProps}
      />
    </InputControl>
  )
}

const InputStyled = styled(IMaskInput)(({ theme }) => ({
  fontSize: 14,
  lineHeight: '20px',
  fontStyle: 'normal',
  height: 40,
  padding: '12px 10px 12px 16px',
  webkitTextFillColor: mono[600],
  color: mono[600],
  fontWeight: 500,
  backgroundColor: theme.palette.base.white,
  border: `1px solid ${theme.palette.base.separate_nav}`,
  borderRadius: 4,
  fontFamily: theme.typography.fontFamily,
  '&::placeholder': {
    color: mono[200],
  },
  '&:focus': {
    outline: 'none',
  },
}))

export { InputNumber }
