import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
  FlatButton,
  RaisedButton,
  AutoComplete
} from 'material-ui'

import './style.css'

// const Users = (props) => {
class Users extends Component {
  constructor(props) {
    super(props)

    this.renderUserRows = this.renderUserRows.bind(this)
  }

  renderUserRows() {
    const { users, button1, button2 } = this.props

    const userRows = users.map(user => {
      const { id, firstName, lastName, linkedinId } = user

      const rowButton1 = (
        <TableRowColumn>
          <RaisedButton backgroundColor="#bed62f" label={button1} />
        </TableRowColumn>
      )
      const rowButton2 = (
        <TableRowColumn>
          <FlatButton
            style={{ color: 'red' /* Override text color inside FlatButton */ }}
            label={button2}
          />
        </TableRowColumn>
      )

      return (
        <TableRow key={id}>
          <TableRowColumn>
            {firstName} {lastName}
          </TableRowColumn>
          <TableRowColumn>{linkedinId}</TableRowColumn>
          <TableRowColumn>Jun 15, 1988</TableRowColumn>
          <TableRowColumn>
            <RaisedButton backgroundColor="#8195b1" label="View" />
          </TableRowColumn>
          {rowButton1}
          {rowButton2}
        </TableRow>
      )
    })

    return userRows
  }

  render() {
    const { title, users } = this.props

    const autoCompleteBank = users.map(user => user.linkedinId)

    return (
      <div className="admin-table-list">
        <h2 className="admin-subtitle">{title}</h2>
        <div className="admin-search-filter">
          <AutoComplete
            hintText="Search"
            dataSource={autoCompleteBank}
            fullWidth
            maxSearchResults={4}
            filter={AutoComplete.fuzzyFilter}
            onNewRequest={
              {
                /* Insert Action here */
              }
            }
          />
        </div>
        <div className="admin-table-list-entries">
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Created On</TableHeaderColumn>
                <TableHeaderColumn />
                <TableHeaderColumn />
                <TableHeaderColumn />
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.renderUserRows()}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
}

Users.propTypes = {
  users: PropTypes.element.isRequired,
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default connect()(Users)
