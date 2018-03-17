import React from 'react'
import TextField from 'material-ui/TextField'
import { style } from './styles'

export const StyledTextField = props => {
  const { text, multiLine, disabled, input, required } = props
  const isMultiLine = !!multiLine
  const errorStyle = required ? style.error : {}
  const errorText = required ? 'This field is required' : ''

  return (
    <TextField
      underlineStyle={style.textFieldUnderline}
      floatingLabelStyle={style.textFloating}
      floatingLabelFocusStyle={style.textFloating}
      hintStyle={style.textHint}
      multiLine={isMultiLine}
      floatingLabelText={text}
      disabled={disabled}
      errorText={errorText}
      errorStyle={errorStyle}
      {...input}
    />
  )
}
