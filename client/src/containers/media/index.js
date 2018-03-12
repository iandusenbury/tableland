import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProfessional } from '../../actions'

import Media from '../../components/edit/Media'

const mapStateToProps = state => ({
    profileVideo: state.app.professionalPage.media.video.url
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchProfessional,
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(Media)