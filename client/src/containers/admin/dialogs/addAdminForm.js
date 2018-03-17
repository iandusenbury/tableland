import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addAdmin } from '../../../actions/admin'
import AddAdminForm from '../../../components/admin/dialogs/addAdminForm'

const mapStateToProps = state => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(AddAdminForm)
