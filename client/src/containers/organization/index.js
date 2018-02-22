import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchOrgData } from '../../actions'

import Organization from '../../components/organization'

const mapStateToProps = state => ({
    organization: state.app.organization.organization
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchOrgData
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(Organization)