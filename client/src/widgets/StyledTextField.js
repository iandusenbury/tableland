import React from 'react'
import TextField from 'material-ui/TextField'
import { style } from './styles'

export const StyledTextField = props => {
  const { text, multiLine, disabled, input, required, meta: { error, touched }, fullWidth } = props
  const isMultiLine = !!multiLine
  const errorStyle = required ? style.error : {}
  const errorText = error ? error : ''

  return (
    <TextField
      underlineStyle={style.textFieldUnderline}
      floatingLabelStyle={style.textFloating}
      floatingLabelFocusStyle={style.textFloating}
      hintStyle={style.textHint}
      multiLine={isMultiLine}
      floatingLabelText={text}
      disabled={disabled}
      fullWidth={fullWidth}
      errorText={errorText}
      errorStyle={errorStyle}
      {...input}
    />
  )
}
