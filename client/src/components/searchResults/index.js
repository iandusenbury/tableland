import React from 'react'
import { Table, TableBody } from 'material-ui'
import PropTypes from 'prop-types'

import { renderUser, renderOrganization, renderProgram } from './rows'
import './style.css'

class SearchResults extends React.Component {
  constructor(props) {
    super(props)

    this.renderTableRows = this.renderTableRows.bind(this)
  }

  renderTableRows() {
    const { results } = this.props
    const tableRows = results.map(result => {
      const { type } = result
      if (type === 'User') return renderUser(result)
      if (type === 'Program') return renderProgram(result)
      if (type === 'Organization') return renderOrganization(result)
      return null
    })

    return tableRows
  }

  render() {
    const { results } = this.props
    const isEmptyResults = !results || results.length === 0
    return (
      <div className="search-body">
        <div className="search-header">
          <h1 className="search-title">Search Results</h1>
          {isEmptyResults && <p>Sorry, no results were found</p>}
        </div>
        {!isEmptyResults && (
          <div className="search-box">
            <div className="search-box-list">
              <Table height="80vh" selectable={false}>
                <TableBody displayRowCheckbox={false} stripedRows>
                  {this.renderTableRows()}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    )
  }
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired // eslint-disable-line
}

export default SearchResults
