import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ProtectedRoute from '../../components/protectedRoute'

const mapStateToProps = state => ({
  loading: state.app.isLoading.loading,
  signedIn: state.app.user.signedIn
})

export default withRouter(connect(mapStateToProps)(ProtectedRoute))
