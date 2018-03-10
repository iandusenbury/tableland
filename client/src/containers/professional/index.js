import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProfessional, updateMapCurrentProfile } from '../../actions'

import Professional from '../../components/professional'

const mapStateToProps = state => ({
  profileImage: state.app.professionalPage.media.image.url,
  profileVideo: state.app.professionalPage.media.video.url,
  ...state.app.professionalPage
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProfessional,
      updateMapCurrentProfile
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Professional)
