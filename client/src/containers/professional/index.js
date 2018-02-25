import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProfessional } from '../../actions'

import Professional from '../../components/professional'

const portraitImg = require('./portrait.png')

const mapStateToProps = state => ({
  /*
  firstName: state.app.professionalPage.firstName,
  lastName: state.app.professionalPage.lastName,
  description: state.app.professionalPage.description,
  contactUrl: state.app.professionalPage.contactUrl,
  mainTitle: state.app.professionalPage.mainTitle,
  mainLocation: state.app.professionalPage.mainLocation,
  */
  profileImage: state.app.professionalPage.media.image.url || portraitImg,
  profileVideo: state.app.professionalPage.media.video,
  /*
  experiences: state.app.professionalPage.experiences,
  */
  ...state.app.professionalPage
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProfessional
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Professional)
