import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ExistingExperiences from '../../components/edit/ExistingExperiences'
import { updateUserExperience } from '../../actions/edit'

const mapStateToProps = state => ({
  experiences: state.app.user.experiences,
  initialValues: {
    existingExp: state.app.edit.existingExp
  }
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUserExperience
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(ExistingExperiences)
