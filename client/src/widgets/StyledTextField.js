import React from 'react'
import TextField from 'material-ui/TextField'
import { style } from './styles'

export const StyledTextField = props => {
  const { text, multiLine, disabled, org, input, meta: { error }, required } = props

  const underlineStyle = org ? style.organization : {}
  const errorStyle = required ? style.error : {}
  const errorText = required ? 'This field is required' : ''


  return (
    <TextField
      underlineFocusStyle={underlineStyle}
      floatingLabelStyle={style.textFloating}
      floatingLabelFocusStyle={style.textFloating}
      hintStyle={style.textHint}
      multiLine={multiLine}
      errorText={error}
      errorStyle={errorStyle}
      floatingLabelText={text}
      disabled={disabled}
      {...input}
    />
  )
}
