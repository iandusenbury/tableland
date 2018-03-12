import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {submit} from 'redux-form'
import { fetchProfessional } from '../../actions'
import {createThings} from "../../actions/edit";

import EditProfile from '../../components/edit'

const mapStateToProps = state => ({
    profileImage: state.app.professionalPage.media.image.url,
    userId: state.app.user.id,
    loading: state.app.isLoading.loading
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            submit,
            createThings
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
