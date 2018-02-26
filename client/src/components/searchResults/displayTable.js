import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, TableBody } from 'material-ui'

import { renderUser, renderOrganization, renderProgram } from './rows'

// TODO: remove this rule once the require statment has been removed
/* eslint-disable global-require */
class DisplayTable extends Component {
  constructor(props) {
    super(props)

    this.renderTableRows = this.renderTableRows.bind(this)
  }

  renderTableRows() {
    const { results } = this.props

    const tableRows = results.map(result => {
      let renderRow
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
          renderRow = renderUser // change later
          break
      }
      return renderRow(result)
    })

    return tableRows
  }

  render() {
    return (
      <Table selectable={false}>
        <TableBody displayRowCheckbox={false} stripedRows>
          {this.renderTableRows()}
        </TableBody>
      </Table>
    )
  }
}

DisplayTable.propTypes = {
  results: PropTypes.element.isRequired
}

export default DisplayTable
