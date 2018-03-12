import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {submit} from 'redux-form'
import {createThings} from "../../actions/edit";


import NewExperiences from '../../components/edit/NewExperiences'

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
           createThings
        },
        dispatch
    )

export default connect(null, mapDispatchToProps)(NewExperiences)