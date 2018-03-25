import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import {
    fetchProgram,
    updateProgram,
    updateProgramVideo
} from '../../actions'
import { fetchUserPermissions } from '../../actions/admin'
import EditProg from '../../components/editProgram'

const mapStateToProps = state => ({
    videoID: state.app.program.media.video.id,
    id: state.app.program.id,
    permissions: state.app.admin.programs,
    userId: state.app.user.id
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchProgram,
            fetchUserPermissions,
            updateProgramVideo,
            updateProgram,
            submit
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(EditProg)