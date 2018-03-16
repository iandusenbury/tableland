import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { revokeAdmin, fetchTypePermissions } from '../../../actions/admin'
import AdminTable from '../../../components/admin/dialogs/adminTable'

const mapStateToProps = state => ({
  type: state.app.dialog.dialogData.type,
  typeId: state.app.dialog.dialogData.typeId,
  admins: state.app.admin.typePermissions.admins
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      revokeAdmin,
      fetchTypePermissions
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(AdminTable)
