import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchAllUsers,
  toggleUserVisibility,
  toggleUserSuperAdmin,
  revokeAllUserAdminPermissions
} from '../../actions/admin'

import UserTable from '../../components/admin/userTable'

const mapStateToProps = state => ({
  users: state.app.admin.users
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllUsers,
      toggleUserVisibility,
      toggleUserSuperAdmin,
      revokeAllUserAdminPermissions
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(UserTable)
