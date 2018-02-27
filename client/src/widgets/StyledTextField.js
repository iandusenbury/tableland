import React from 'react'
import TextField from 'material-ui/TextField'
import { style } from './styles'

export const StyledTextField = props => {
  const { text, multiLine, disabled, org } = props
  const isMultiLine = !!multiLine

  const underlineStyle = org ? style.organization : {}

  return (
    <TextField
      underlineFocusStyle={underlineStyle}
      floatingLabelStyle={style.textFloating}
      floatingLabelFocusStyle={style.textFloating}
      hintStyle={style.textHint}
      multiLine={isMultiLine}
      floatingLabelText={text}
      disabled={disabled}
    />
  )
}
