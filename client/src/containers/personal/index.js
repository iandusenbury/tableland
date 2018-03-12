import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProfessional } from '../../actions'

import Personal from '../../components/edit/Personal'

const mapStateToProps = state => ({
    firstName: state.app.professionalPage.firstName,
    lastName: state.app.professionalPage.lastName,
    description: state.app.professionalPage.description,
    mainTitle: state.app.professionalPage.mainTitle
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchProfessional
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(Personal)
