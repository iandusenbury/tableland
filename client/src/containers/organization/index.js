import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchOrganization, navigateToProfessional } from '../../actions'

import Organization from '../../components/organization'

const portraitImg = require('../../components/professional/portrait.png')

const mapStateToProps = state => ({
  organizationImage: state.app.organizationPage.media.image.url || portraitImg,
  organizationVideo: state.app.organizationPage.media.video.url || null,
  ...state.app.organizationPage
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOrganization,
      navigateToProfessional
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Organization)
