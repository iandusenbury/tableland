import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '../../../containers/dialog'
import AdminTable from '../../../containers/admin/dialogs/adminTable'

const AdminPermissionsDialog = props => {
  const { dialogIsOpen } = props

  return (
    <Dialog open={dialogIsOpen} autoScrollBodyContent>
      <AdminTable />
    </Dialog>
  )
}

AdminPermissionsDialog.propTypes = {
  dialogIsOpen: PropTypes.bool.isRequired
}

export default AdminPermissionsDialog
