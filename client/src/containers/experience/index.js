import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProfessional } from '../../actions'
import {submit} from 'redux-form'

import ExistingExperiences from '../../components/edit/ExistingExperiences'

const mapStateToProps = state => ({
    experiences: state.app.professionalPage.experiences
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchProfessional,
            submit
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(ExistingExperiences)