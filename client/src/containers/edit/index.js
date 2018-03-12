import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProfessional } from '../../actions'
import {submit} from 'redux-form'

import EditProfile from '../../components/edit'

const mapStateToProps = state => ({
    profileImage: state.app.professionalPage.media.image.url,
    firstName: state.app.professionalPage.firstName
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchProfessional,
            submit
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
