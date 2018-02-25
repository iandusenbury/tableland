import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProfessional } from '../../actions'

import Professional from '../../components/professional'

const mapStateToProps = state => ({
  user: state.app.professionalPage.user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProfessional
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Professional)
