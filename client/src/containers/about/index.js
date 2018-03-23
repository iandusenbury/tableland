import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {updateOrganization} from "../../actions";
import About from '../../components/editOrganization/About'


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
           updateOrganization
        },
        dispatch
    )

export default connect(null, mapDispatchToProps)(About)