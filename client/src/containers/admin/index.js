import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { adminChangeTableTo, adminChangeAdminTo } from '../../actions'

import AdminPage from '../../components/admin'

const mapStateToProps = state => ({
  tables: state.app.adminPage.tables,
  currentTable: state.app.adminPage.currentTable,
  isAdmin: state.app.adminPage.isAdmin
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      adminChangeTableTo,
      adminChangeAdminTo
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
