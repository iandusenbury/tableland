import { connect } from 'react-redux'

import AdminPage from '../../components/admin'

const mapStateToProps = state => ({
  isSuperAdmin: state.app.user.isSuperAdmin
})

export default connect(mapStateToProps)(AdminPage)
