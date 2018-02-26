import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { bindActionCreators } from 'redux'
import SearchResults from '../../components/searchResults'
// import { sendSearchKey, updateSearchKey } from '../../actions'
import { updateSearchKey } from '../../actions'

const searchKeySelector = formValueSelector('searchBar')

const mapStateToProps = state => {
  const retrievedSearchKey = searchKeySelector(state, 'searchKey')
  return {
    retrievedSearchKey,
    searchKey: state.app.search.searchKey,
    results: state.app.search.results
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // sendSearchKey,
      updateSearchKey
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
