import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Media from '../../components/edit/Media'
import { updateUserVideo } from '../../actions/edit'

const mapStateToProps = state => ({
  initialValues: {
    profileVideo: state.app.user.media.video.url
  }
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUserVideo
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Media)
