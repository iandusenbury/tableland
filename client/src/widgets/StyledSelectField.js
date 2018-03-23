import React from 'react'
import { SelectField } from 'material-ui'

import { style } from './styles'

export const StyledSelectField = props => {
  const { text, children, input, custom } = props

  return (
    <SelectField
      floatingLabelText={text}
      underlineStyle={style.textFieldUnderline}
      floatingLabelStyle={style.textFloating}
      hintStyle={style.textHint}
      menuItemStyle={style.textHint}
      {...input}
      {...custom}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
    />
  )
}
