import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import {
  createThings,
  updateUserExperience,
  updateUserInfo,
  updateUserVideo
} from '../../actions/edit'
import { placesClearAll } from '../../actions'

import EditProfile from '../../components/edit'

const mapStateToProps = state => ({
  profileImage: state.app.user.media.image.url,
  userId: state.app.user.id,
  videoId: state.app.user.media.video.id,
  loading: state.app.isLoading.loading,
  placesResults: state.app.places.placesResults
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submit,
      createThings,
      updateUserInfo,
      updateUserExperience,
      updateUserVideo,
      placesClearAll
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
