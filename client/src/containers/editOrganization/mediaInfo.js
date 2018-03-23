import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MediaInfo from '../../components/editOrganization/MediaInfo'
import { updateOrgVideo } from '../../actions'

const mapStateToProps = state => ({
    initialValues: {
        organizationVideo: state.app.organizationPage.media.video.url || null
    }
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            updateOrgVideo
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(MediaInfo)