import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import {
  createThings,
  updateUserExperience,
  updateUserInfo,
  updateUserVideo
} from '../../actions/edit'
import { openDialog } from '../../actions'

import EditProfile from '../../components/edit'

const mapStateToProps = state => ({
  profileImage: state.app.user.media.image.url,
  userId: state.app.user.id,
  videoId: state.app.user.media.video.id,
  loading: state.app.isLoading.loading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submit,
      createThings,
      updateUserInfo,
      updateUserExperience,
      updateUserVideo,
      displayErrorMessage: errorMessages =>
        openDialog(1, {
          message: 'Required Fields Missing',
          description: errorMessages.join(', ')
        })
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
