import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { authorizeUser, fetchUser } from '../../actions'

import Navbar from '../../components/navbar'

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authorizeUser,
      fetchUser
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Navbar)
