import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  authorizeUser,
  fetchUser,
  logoutUser,
  fetchResults
} from '../../actions'

import Navbar from '../../components/navbar'

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authorizeUser,
      fetchUser,
      logoutUser,
      fetchResults
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Navbar)
