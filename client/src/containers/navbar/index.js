import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { authorizeUser, logoutUser, fetchUser } from '../../actions'

import Navbar from '../../components/navbar'

const mapStateToProps = state => ({
  dialogIsOpen: state.app.dialog.open === 1
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authorizeUser,
      fetchUser,
      logoutUser
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
