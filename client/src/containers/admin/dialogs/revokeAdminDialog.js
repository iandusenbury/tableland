import { connect } from 'react-redux'

import RevokeAdminDialog from '../../../components/admin/dialogs/revokeAdminDialog'

const mapStateToProps = state => ({
  dialogIsOpen: state.app.dialog.open === 3
})

export default connect(mapStateToProps)(RevokeAdminDialog)
