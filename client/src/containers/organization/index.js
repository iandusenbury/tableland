import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchOrganization } from '../../actions'

import Organization from '../../components/organization'

const mapStateToProps = state => ({
  ...state.app.organizationPage
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOrganization
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Organization)
