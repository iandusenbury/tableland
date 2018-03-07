import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProfessional } from '../../actions'
import {submit} from 'redux-form'

import EditProfile from '../../components/edit'

const mapStateToProps = state => ({
    profileImage: state.app.professionalPage.media.image.url,
    profileVideo: state.app.professionalPage.media.video.url,
    ...state.app.professionalPage
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchProfessional,
            submit
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
