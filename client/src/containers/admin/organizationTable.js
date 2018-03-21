import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { openDialog } from '../../actions'
import { toggleOrganizationVisibility } from '../../actions/admin'

import OrganizationTable from '../../components/admin/organizationTable'

const mapStateToProps = state => ({
  organizations: state.app.admin.organizations
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openDialog,
      toggleOrganizationVisibility
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationTable)
