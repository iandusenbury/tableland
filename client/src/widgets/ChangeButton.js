import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import { style } from './styles'

export const ChangeButton = props => (
  <RaisedButton
    label="Edit"
    primary
    icon={<Edit />}
    labelPosition="after"
    style={style.changeButton}
    buttonStyle={style.buttonStyle}
  />
)
