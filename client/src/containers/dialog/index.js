import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { closeDialog } from '../../actions'

import Dialog from '../../components/dialog'

const mapStateToProps = state => ({
  message: state.app.dialog.dialogData.message
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeDialog
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Dialog)
