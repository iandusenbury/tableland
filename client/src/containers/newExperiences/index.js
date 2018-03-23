import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createThings } from '../../actions/edit'
import { placesUpdateResult } from '../../actions'
import NewExperiences from '../../components/edit/NewExperiences'

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createThings,
      placesUpdateResult
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(NewExperiences)
