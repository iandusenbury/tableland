import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUserPermissions } from '../../actions/admin'
import AdminPage from '../../components/admin'

const mapStateToProps = state => ({
  isSuperAdmin: state.app.user.isSuperAdmin,
  userId: state.app.user.id
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserPermissions
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
