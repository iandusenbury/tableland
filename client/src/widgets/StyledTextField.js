import React from 'react'
import TextField from 'material-ui/TextField'
import { style } from './styles'

export const StyledTextField = props => {
  const { text, multiLine, disabled, org, input } = props

  const underlineStyle = org ? style.organization : {}

  return (
    <TextField
      underlineFocusStyle={underlineStyle}
      floatingLabelStyle={style.textFloating}
      floatingLabelFocusStyle={style.textFloating}
      hintStyle={style.textHint}
      multiLine={multiLine}
      floatingLabelText={text}
      disabled={disabled}
      {...input}
    />
  )
}
