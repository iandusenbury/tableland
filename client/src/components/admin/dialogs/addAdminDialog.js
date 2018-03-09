import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '../../../containers/dialog'
import UserList from '../../../containers/admin/dialogs/userList'
import NotFound from '../../notFound'

import '../style.css'

const AddAdminDialog = props => {
  const { dialogIsOpen, isSuperAdmin } = props

  const componentToRender = () => {
    if (isSuperAdmin) return <UserList />

    return <NotFound />
  }

  return (
    <Dialog open={dialogIsOpen} autoScrollBodyContent>
      {componentToRender()}
    </Dialog>
  )
}

AddAdminDialog.propTypes = {
  dialogIsOpen: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired
}

export default AddAdminDialog
