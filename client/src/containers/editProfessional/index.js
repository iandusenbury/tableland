import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProfessional } from '../../actions'
import EditProfessional from '../../components/edit'

const mapStateToProps = state => ({
    profileImage: state.app.professionalPage.media.image.url || portraitImg,
    profileVideo: state.app.professionalPage.media.video.url,
    ...state.app.professionalPage
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchProfessional
        },
        dispatch
    )

export default connect(mapDispatchToProps)(EditProfessional)
