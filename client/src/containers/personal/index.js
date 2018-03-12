import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProfessional } from '../../actions'

import Personal from '../../components/edit/Personal'

const mapStateToProps = state => ({
    firstName: state.app.user.firstName,
    lastName: state.app.user.lastName,
    description: state.app.user.description,
    mainTitle: state.app.user.mainTitle
})


export default connect(mapStateToProps)(Personal)
