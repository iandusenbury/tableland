import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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