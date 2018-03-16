import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Media from '../../components/edit/Media'
import {changeUserVideo} from "../../actions/edit";

const mapStateToProps = state => ({
    profileVideo: state.app.user.media.video.url
})


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            changeUserVideo
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(Media)