import React from 'react'
import TextField from 'material-ui/TextField'
import { style } from './styles'

export const StyledTextField = props => {
  const {
    text,
    multiLine,
    disabled,
    input,
    required,
    dynamicRequired,
    meta: { error, touched },
    fullWidth,
    org
  } = props
  const isMultiLine = !!multiLine
  // const errorStyle = required ? style.error : {}
  const underlineStyle = org ? style.organization : {}
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
      underlineFocusStyle={underlineStyle}
      floatingLabelStyle={style.textFloating}
      floatingLabelFocusStyle={style.textFloating}
      hintStyle={style.textHint}
      multiLine={multiLine}
      errorText={error}
      // errorStyle={errorStyle}
      floatingLabelText={text}
      disabled={disabled}
      fullWidth={fullWidth}
      {...input}
    />
  )
}
