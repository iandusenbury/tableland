import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { style } from './styles'

export const AddButton = props => {
  const { label } = props

  return (
    <RaisedButton
      label={label}
      primary
      icon={<ContentAdd />}
      labelPosition="after"
      style={style.addButton}
      buttonStyle={style.buttonStyle}
      type="submit"
    />
  )
}
