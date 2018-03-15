import { connect } from 'react-redux'
import SearchResults from '../../components/searchResults'

const mapStateToProps = state => ({
  ...state.app.search
})

export default connect(mapStateToProps, null)(SearchResults)
