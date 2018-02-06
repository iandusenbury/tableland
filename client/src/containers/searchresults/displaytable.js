import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
        <TableRow className="table-row-stripe" key={id}>
          <TableRowColumn className="table-cell">
            <div className="table-name table-border">
              <h2>
                {firstName} {lastName}
              </h2>
            </div>
            <div className="table-icon table-border">
              <div className="table-avatar">
                <Avatar size={60} src={require('./portrait.png')} />
              </div>
              <FlatButton className="table-flatbutton" hoverColor="#e7e0d7">
                View profile
              </FlatButton>
            </div>
            <div className="table-about">
              <ul>
                <li>{title}</li>
                <li>Working at: {orgName}</li>
              </ul>
            </div>
            <ul className="table-contact">
              <li>LinkedIn: {linkedinId}</li>
              <li>Contact: {contactUrl}</li>
            </ul>
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

export default connect()(DisplayTable)
