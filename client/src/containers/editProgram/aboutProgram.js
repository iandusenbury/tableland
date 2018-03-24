import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AboutProgram from '../../components/editProgram/AboutProgram'
import { updateProgram} from "../../actions";

const mapStateToProps = state => ({
    initialValues: {
        name: state.app.program.name,
        description: state.app.program.description,
        url: state.app.program.url
    }
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            updateProgram
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(AboutProgram)