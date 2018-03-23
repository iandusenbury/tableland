import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {submit} from 'redux-form'
import { fetchOrganization, updateOrganization, updateOrgVideo } from '../../actions'
import EditOrg from '../../components/editOrganization'


const mapStateToProps = state => ({
    organizationVideo: state.app.organizationPage.media.video.url || null,
    videoID: state.app.organizationPage.media.video.id,
    loading: state.app.isLoading.loading,
    ...state.app.organizationPage
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