import React from 'react'
import { FlatButton, Table, TableBody } from 'material-ui'
import PropTypes from 'prop-types'
import './style.css'
import { renderUser, renderOrganization, renderProgram } from './rows'

class SearchResults extends React.Component {
  constructor(props) {
    super(props)

    this.renderTableRows = this.renderTableRows.bind(this)
  }

  renderTableRows() {
    const { results } = this.props
    const tableRows = results.map(result => {
      let renderRow = null
      const { type } = result
      switch (type) {
        case 'User':
          renderRow = renderUser
          break
        case 'Program':
          renderRow = renderProgram
          break
        case 'Organization':
          renderRow = renderOrganization
          break
        default:
          break
      }
      return renderRow ? renderRow(result) : null
    })

    return tableRows
  }

  render() {
    const { results } = this.props
    const isEmptyResults = results.length === 0
    return (
      <div>
        <div className="search-header">
          <h1 className="search-title">Search Results</h1>
          {isEmptyResults && <p>Sorry, no results were found</p>}
        </div>
        <div className="search-box">
          <div className="search-box-list">
            <Table selectable={false}>
              <TableBody displayRowCheckbox={false} stripedRows>
                {this.renderTableRows()}
              </TableBody>
            </Table>
          </div>
          <div className="search-back-to-top">
            {!isEmptyResults && (
              <FlatButton hoverColor="#bed62f" href="#top" fullWidth>
                Return to top of results
              </FlatButton>
            )}
          </div>
        </div>
      </div>
    )
  }
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired // eslint-disable-line
}

export default SearchResults
