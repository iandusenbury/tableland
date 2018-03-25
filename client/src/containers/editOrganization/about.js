import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import About from '../../components/editOrganization/About'
import { updateOrganization, placesUpdateResult } from '../../actions'

const mapStateToProps = state => ({
  initialValues: {
    name: state.app.organizationPage.name,
    description: state.app.organizationPage.description,
    address: state.app.organizationPage.addressLine1,
    url: state.app.organizationPage.url
  }
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateOrganization,
      placesUpdateResult
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(About)
