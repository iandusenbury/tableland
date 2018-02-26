import React from 'react'
import { FlatButton } from 'material-ui'
import PropTypes from 'prop-types'
import DisplayTable from './displayTable'
import './style.css'
// import dummyTable from './dummies'

let displaySearchKey

const displaySearchKeyMessage = searchKey => {
  if (displaySearchKey !== '') {
    return <p>Results for {`"${searchKey}"`}</p>
  }
  return <p>Enter a search term</p>
}

class SearchResults extends React.Component {
  componentWillMount() {
    // const { sendSearchKey, retrievedSearchKey, updateSearchKey } = this.props
    const { retrievedSearchKey, updateSearchKey } = this.props
    if (retrievedSearchKey !== undefined) {
      displaySearchKey = `${retrievedSearchKey}`
    } else {
      displaySearchKey = ''
    }
    // sendSearchKey(displaySearchKey)
    updateSearchKey(displaySearchKey)
  }

  render() {
    const { results, searchKey } = this.props
    return (
      <div>
        <div className="search-header">
          <h1 className="search-title">Search Results</h1>
          {displaySearchKeyMessage(searchKey)}
        </div>
        <div className="search-box">
          <div className="search-box-list">
            <DisplayTable results={results} />
          </div>
          <div className="search-back-to-top">
            <FlatButton hoverColor="#bed62f" href="#top" fullWidth>
              Return to top of results
            </FlatButton>
          </div>
        </div>
      </div>
    )
  }
}

SearchResults.propTypes = {
  searchKey: PropTypes.element.isRequired,
  retrievedSearchKey: PropTypes.element.isRequired,
  results: PropTypes.element.isRequired,
  // sendSearchKey: PropTypes.func.isRequired,
  updateSearchKey: PropTypes.func.isRequired
}

export default SearchResults
