import { connect } from 'react-redux'

import AddAdminDialog from '../../../components/admin/dialogs/addAdminDialog'

const mapStateToProps = state => ({
  dialogIsOpen: state.app.dialog.open === 2,
  isSuperAdmin: state.app.user.isSuperAdmin
})

export default connect(mapStateToProps)(AddAdminDialog)
