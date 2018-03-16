import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {updateUserInfo} from "../../actions/edit";
import Personal from '../../components/edit/Personal'

const mapStateToProps = state => ({
    firstName: state.app.user.firstName,
    lastName: state.app.user.lastName,
    description: state.app.user.description,
    mainTitle: state.app.user.mainTitle
})


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            updateUserInfo
        },
        dispatch
    )



export default connect(mapDispatchToProps,mapStateToProps)(Personal)
