import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchMapProfessional } from '../../actions'
import SearchResultRow from '../../components/searchResultRow'

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMapProfessional
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(SearchResultRow)
