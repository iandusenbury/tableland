import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import PrivateRoute from '../../components/privateRoute'

const mapStateToProps = state => ({
  loading: state.app.isLoading.loading,
  isAdmin: state.app.user.isAdmin
})

export default withRouter(connect(mapStateToProps)(PrivateRoute))
