import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchAllUsers,
  toggleUserVisibility,
  toggleUserSuperAdmin
} from '../../actions/admin'
import { openDialog } from '../../actions'

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
      openDialog
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(UserTable)
