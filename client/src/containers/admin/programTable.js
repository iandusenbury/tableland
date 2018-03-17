import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { openDialog } from '../../actions'
import { toggleProgramVisibility } from '../../actions/admin'

import ProgramTable from '../../components/admin/programTable'

const mapStateToProps = state => ({
  programs: state.app.admin.programs
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openDialog,
      toggleProgramVisibility
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(ProgramTable)
