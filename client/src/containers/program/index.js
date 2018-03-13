import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProgram } from '../../actions'

import Program from '../../components/program'

const mapStateToProps = state => ({
  ...state.app.program
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProgram
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Program)
