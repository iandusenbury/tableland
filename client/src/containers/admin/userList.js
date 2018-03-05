import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAllUsers, toggleUserVisibility } from '../../actions/admin'

import UserList from '../../components/admin/userList'

const mapStateToProps = state => ({
  users: state.app.admin.users
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllUsers,
      toggleUserVisibility
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
