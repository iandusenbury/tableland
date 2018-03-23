import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import PropTypes from 'prop-types'
import { style } from './styles'

export const AddButton = props => {
  const { label, onClick } = props

  return (
    <RaisedButton
      label={label}
      primary
      icon={<ContentAdd />}
      labelPosition="after"
      style={style.addButton}
      buttonStyle={style.buttonStyle}
      type="submit"
      onClick={onClick}
    />
  )
}

AddButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default AddButton
