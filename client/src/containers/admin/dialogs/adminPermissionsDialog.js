import { connect } from 'react-redux'

import AdminPermissionsDialog from '../../../components/admin/dialogs/adminPermissionsDialog'

const mapStateToProps = state => ({
  dialogIsOpen: state.app.dialog.open === 4
})

export default connect(mapStateToProps)(AdminPermissionsDialog)
