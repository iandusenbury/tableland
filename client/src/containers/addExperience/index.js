import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addProgram, addExp } from '../../actions'
import AddExperience from '../../components/edit/AddExperience'

const mapStateToProps = state => ({
    ...state.app.addExperience
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            addProgram,
            addExp
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(AddExperience)
