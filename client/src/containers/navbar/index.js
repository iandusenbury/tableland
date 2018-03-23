import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { authorizeUser, logoutUser, fetchUser, fetchProfessional } from '../../actions'
import { fetchMapProfessional } from '../../actions/gmap'

import Navbar from '../../components/navbar'

const mapStateToProps = state => ({
  dialogIsOpen: state.app.dialog.open === 1,
  ...state.app.user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authorizeUser,
      fetchUser,
      logoutUser,
      fetchMapProfessional,
      fetchProfessional
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
