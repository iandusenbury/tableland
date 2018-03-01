import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { closeDialog } from '../../actions'

import Dialog from '../../components/dialog'

const mapStateToProps = state => ({
  open: state.app.dialog.open,
  message: state.app.dialog.message
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeDialog
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Dialog)
