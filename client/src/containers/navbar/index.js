import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { authorizeUser } from '../../actions'

import Navbar from '../../components/navbar'

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authorizeUser
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Navbar)
