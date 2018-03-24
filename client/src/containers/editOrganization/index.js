import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import {
  fetchOrganization,
  updateOrganization,
  updateOrgVideo
} from '../../actions'
import { fetchUserPermissions } from '../../actions/admin'
import EditOrg from '../../components/editOrganization'

const mapStateToProps = state => ({
  videoID: state.app.organizationPage.media.video.id,
  id: state.app.organizationPage.id,
  placesResult: state.app.places.placesResults[0],
  permissions: state.app.admin.organizations,
  userId: state.app.user.id
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOrganization,
      fetchUserPermissions,
      updateOrganization,
      updateOrgVideo,
      submit
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(EditOrg)
