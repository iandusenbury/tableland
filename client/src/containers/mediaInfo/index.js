import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {updateOrgVideo} from "../../actions";
import MediaInfo from '../../components/editOrganization/MediaInfo'


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            updateOrgVideo
        },
        dispatch
    )

export default connect(null, mapDispatchToProps)(MediaInfo)