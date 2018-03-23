import React from 'react'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
import { style } from './styles'

export const StyledTextField = props => {
  const {
    text,
    multiLine,
    disabled,
    input,
    // required,
    // dynamicRequired,
    meta: { error },
    fullWidth
  } = props
  const isMultiLine = !!multiLine
  // const errorStyle = required ? style.error : {}
  // const errorText = () => {
  //   if (error) {
  //     return error
  //   } else if (!dynamicRequired && required) {
  //     return 'Required'
  //   }
  //   return ''
  // }

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
      errorText={error}
      // errorStyle={errorStyle}
      {...input}
    />
  )
}

StyledTextField.propTypes = {
  text: PropTypes.string.isRequired,
  /* eslint-disable */
  input: PropTypes.object.isRequired,
  multiLine: PropTypes.bool,
  disabled: PropTypes.bool,
  meta: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool
  /* eslint-enable */
}

export default StyledTextField
