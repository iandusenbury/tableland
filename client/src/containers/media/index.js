import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import Media from '../../components/edit/Media'

const mapStateToProps = state => ({
    profileVideo: state.app.user.media.video.url
})

export default connect(mapStateToProps)(Media)