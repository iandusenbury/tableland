import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchResults } from '../../actions'

import SearchBarForm from '../../components/searchBarForm'

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchResults
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(SearchBarForm)
