import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addAdmin } from '../../../actions/admin'
import UserList from '../../../components/admin/dialogs/userList'

const mapStateToProps = state => ({
  dialogIsOpen: state.app.dialog.open === 2,
  users: state.app.admin.users,
  type: state.app.dialog.dialogData.type,
  typeId: state.app.dialog.dialogData.typeId
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addAdmin
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
