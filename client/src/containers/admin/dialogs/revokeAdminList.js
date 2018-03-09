import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  revokeOrganizationAdmin,
  fetchUserAdminPermissions
} from '../../../actions/admin'
import RevokeAdminList from '../../../components/admin/dialogs/revokeAdminList'

const mapStateToProps = state => ({
  dialogIsOpen: state.app.dialog.open === 3,
  organizations: state.app.admin.userPermissions.organizations,
  userId: state.app.dialog.dialogData.userId
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserAdminPermissions,
      revokeOrganizationAdmin
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(RevokeAdminList)
