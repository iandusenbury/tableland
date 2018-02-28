import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProfessional } from '../../actions'

import Map from '../../components/map'

const portraitImg = require('../professional/portrait.png')

const mapStateToProps = state => ({
  profileImage: state.app.professionalPage.media.image.url || portraitImg,
  ...state.app.professionalPage
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProfessional
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Map)
