import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  authorizeUser,
  logoutUser,
  fetchUser,
  updateMapCurrentProfile
} from '../../actions'

import Navbar from '../../components/navbar'

const mapStateToProps = state => ({
  dialogIsOpen: state.app.dialog.open === 1,
  profileID: state.app.user.id || 0
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authorizeUser,
      fetchUser,
      logoutUser,
      updateMapCurrentProfile
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
