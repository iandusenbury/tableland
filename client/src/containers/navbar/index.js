import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { authorizeUser, logoutUser, fetchUser } from '../../actions'

import Navbar from '../../components/navbar'

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authorizeUser,
      logoutUser,
      fetchUser
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Navbar)
