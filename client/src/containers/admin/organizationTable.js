import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAllOrganizations } from '../../actions/admin'
import { openDialog } from '../../actions'

import OrganizationTable from '../../components/admin/organizationTable'

const mapStateToProps = state => ({
  organizations: state.app.admin.organizations
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllOrganizations,
      openDialog
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationTable)
