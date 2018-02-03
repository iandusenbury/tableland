import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchExample } from '../../actions'

import App from '../../components/app'

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchExample
}, dispatch)

export default withRouter(connect(
  null,
  mapDispatchToProps
)(App))
