import React from 'react'
import TextField from 'material-ui/TextField'
import { style } from './styles'

export const StyledTextField = props => {
  const { text, multiLine, disabled, value } = props
  const isMultiLine = !!multiLine

  return (
    <TextField
      underlineStyle={style.textFieldUnderline}
      floatingLabelStyle={style.textFloating}
      floatingLabelFocusStyle={style.textFloating}
      hintStyle={style.textHint}
      multiLine={isMultiLine}
      floatingLabelText={text}
      disabled={disabled}
      value={value}
    />
  )
}
