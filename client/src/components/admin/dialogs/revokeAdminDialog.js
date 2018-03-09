import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '../../../containers/dialog'
import RevokeAdminList from '../../../containers/admin/dialogs/revokeAdminList'

import '../style.css'

const AddAdminDialog = props => {
  const { dialogIsOpen } = props

  return (
    <Dialog open={dialogIsOpen} autoScrollBodyContent>
      <RevokeAdminList />
    </Dialog>
  )
}

AddAdminDialog.propTypes = {
  dialogIsOpen: PropTypes.bool.isRequired
}

export default AddAdminDialog
