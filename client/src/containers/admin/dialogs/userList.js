import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addOrganizationAdmin } from '../../../actions/admin'
import UserList from '../../../components/admin/dialogs/userList'

const mapStateToProps = state => ({
  dialogIsOpen: state.app.dialog.open === 2,
  users: state.app.admin.users,
  organizationId: state.app.dialog.dialogData.organizationId
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addOrganizationAdmin
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
