import React from 'react'
import TextField from 'material-ui/TextField'
import { style } from './styles'
import './style.css'

export const StyledTextField = props => {
  const { text, multiLine, disabled, input, required, dynamicRequired, meta: { error, touched }, fullWidth } = props
  const isMultiLine = !!multiLine
  // const errorStyle = required ? style.error : {}
  const errorText = () => {
    if (error) {
      return error
    } else if (!dynamicRequired && required) {
      return 'Required'
    }
    return ''
  }

  return (
    <TextField
      style={{ width: 'auto' }}
      underlineStyle={style.textFieldUnderline}
      floatingLabelStyle={style.textFloating}
      floatingLabelFocusStyle={style.textFloating}
      hintStyle={style.textHint}
      multiLine={isMultiLine}
      floatingLabelText={text}
      disabled={disabled}
      fullWidth={fullWidth}
      errorText={error}
      // errorStyle={errorStyle}
      {...input}
    />
  )
}
