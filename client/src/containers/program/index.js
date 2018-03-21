import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProgram, navigateToProfessional } from '../../actions'

import Program from '../../components/program'

const mapStateToProps = state => ({
  ...state.app.program
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProgram,
      navigateToProfessional
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Program)
