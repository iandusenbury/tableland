import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  Avatar,
  FlatButton
} from 'material-ui'

// TODO: remove this rule once the require statment has been removed
/* eslint-disable global-require */
class DisplayTable extends Component {
  constructor(props) {
    super(props)

    this.renderTableRows = this.renderTableRows.bind(this)
  }

  renderTableRows() {
    const { users } = this.props

    const tableRows = users.map(user => {
      const {
        id,
        firstName,
        lastName,
        title,
        orgName,
        linkedinId,
        contactUrl
      } = user

      return (
        <TableRow className="search-table-row-stripe" key={id}>
          <TableRowColumn className="search-table-cell">
            <div className="search-table-name search-table-border">
              <h2>
                {firstName} {lastName}
              </h2>
            </div>
            <div className="search-table-icon search-table-border">
              <div className="search-table-avatar">
                <Avatar size={60} src={require('./portrait.png')} />
              </div>
              <FlatButton
                className="search-table-flatbutton"
                hoverColor="#e7e0d7">
                View profile
              </FlatButton>
            </div>
            <div className="search-table-about">
              <ul>
                <li>{title}</li>
                <li>{orgName}</li>
              </ul>
            </div>
            <div className="search-table-contact">
              <ul>
                <li>LinkedIn: {linkedinId}</li>
                <li>Contact: {contactUrl}</li>
              </ul>
            </div>
          </TableRowColumn>
        </TableRow>
      )
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
  users: PropTypes.element.isRequired
}

export default DisplayTable
