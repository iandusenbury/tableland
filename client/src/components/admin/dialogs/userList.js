import React, { Component } from 'react'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import PropTypes from 'prop-types'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
  RaisedButton
} from 'material-ui'

import '../style.css'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#ea4e46'
  }
})

export default class UserTable extends Component {
  constructor(props) {
    super(props)

    this.renderUserTable = this.renderUserTable.bind(this)
    this.renderUserRows = this.renderUserRows.bind(this)
  }

  renderUserRows() {
    const { users, typeId, type, addAdmin } = this.props

    return users.map(user => {
      const { id, firstName, email, lastName, role } = user

      const addAdminButton = (
        <RaisedButton
          backgroundColor="#8195b1"
          label="Add"
          onClick={() => addAdmin(email, type, typeId)}
          disabled={role === 'super_admin'}
        />
      )

      return (
        <TableRow key={id}>
          <TableRowColumn>
            {firstName} {lastName}
          </TableRowColumn>
          <TableRowColumn>{email}</TableRowColumn>
          <TableRowColumn>{addAdminButton}</TableRowColumn>
        </TableRow>
      )
    })
  }

  renderUserTable() {
    const headerValues = [
      { tooltip: 'Full Name', value: 'Name' },
      { tooltip: 'Email', value: 'Email' },
      { tooltip: 'Add as admin', value: 'Add' }
    ]

    const mapHeaderValues = headerValues.map(({ tooltip, value }) => (
      <TableHeaderColumn key={value} tooltip={tooltip}>
        {value}
      </TableHeaderColumn>
    ))

    return (
      <div className="table-container">
        <Table height="300px">
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>{mapHeaderValues}</TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows>
            {this.renderUserRows()}
          </TableBody>
        </Table>
      </div>
    )
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {this.renderUserTable()}
      </MuiThemeProvider>
    )
  }
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired, // eslint-disable-line
  typeId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  addAdmin: PropTypes.func.isRequired
}
