import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAllOrganizations } from '../../actions/admin'

import AdminPage from '../../components/admin'

const mapStateToProps = state => ({
  isSuperAdmin: state.app.user.isSuperAdmin,
  organizations: state.app.admin.organizations
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllOrganizations
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
