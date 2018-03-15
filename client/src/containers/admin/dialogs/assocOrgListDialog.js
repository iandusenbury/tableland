import { connect } from 'react-redux'

import AssocOrgListDialog from '../../../components/admin/dialogs/assocOrgListDialog'

const mapStateToProps = state => ({
  dialogIsOpen: state.app.dialog.open === 3
})

export default connect(mapStateToProps)(AssocOrgListDialog)
