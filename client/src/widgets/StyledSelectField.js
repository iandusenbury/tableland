import React from 'react'
import { SelectField } from 'material-ui'
import PropTypes from 'prop-types'
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
      onChange={(event, index, value) => input.onChange(value)}>
      {children}
    </SelectField>
  )
}

StyledSelectField.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  input: PropTypes.object.isRequired, // eslint-disable-line
  custom: PropTypes.object.isRequired // eslint-disable-line
}

export default StyledSelectField
