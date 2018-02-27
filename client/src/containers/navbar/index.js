import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { submit } from 'redux-form'
import {
  authorizeUser,
  fetchUser,
  logoutUser,
  sendSearchKey
} from '../../actions'

import Navbar from '../../components/navbar'

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authorizeUser,
      fetchUser,
      logoutUser,
      sendSearchKey,
      pushSearchResultsPage: () => push('/refresh/results'),
      submit
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Navbar)
