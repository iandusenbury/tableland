import React from 'react'

import { Dialog as MaterialDialog, FlatButton } from 'material-ui'
import PropTypes from 'prop-types'

const Dialog = props => {
  const { message, description, open, closeDialog, children, ...rest } = props

  const actions = [
    <FlatButton label="Close" primary onClick={() => closeDialog()} />
  ]

  return (
    <MaterialDialog
      {...rest}
      title={message}
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={() => closeDialog()}>
      {description}
      {children}
    </MaterialDialog>
  )
}

Dialog.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  description: PropTypes.string.isRequired
}

export default Dialog
