import React from 'react'

import { Dialog as MaterialDialog, FlatButton } from 'material-ui'
import PropTypes from 'prop-types'

const Dialog = props => {
  const { message, open, closeDialog } = props

  const actions = [
    <FlatButton label="Close" primary onClick={() => closeDialog()} />
  ]

  return (
    <MaterialDialog
      title={message}
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={() => closeDialog()}
    />
  )
}

Dialog.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired
}

export default Dialog
