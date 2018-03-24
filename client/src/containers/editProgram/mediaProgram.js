import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MediaInfo from '../../components/editOrganization/MediaInfo'
import {updateProgramVideo} from "../../actions";


const mapStateToProps = state => ({
    initialValues: {
        organizationVideo: state.app.program.media.video.url || null
    }
})


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            updateProgramVideo
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(MediaInfo)