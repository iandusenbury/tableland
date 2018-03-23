import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {submit} from 'redux-form'
import { fetchOrganization, updateOrganization, updateOrgVideo } from '../../actions'
import EditOrg from '../../components/editOrganization'


const mapStateToProps = state => ({
    videoID: state.app.organizationPage.media.video.id,
    id: state.app.organizationPage.id,
    loading: state.app.isLoading.loading
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchOrganization,
            updateOrganization,
            updateOrgVideo,
            submit
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(EditOrg)