import React, { Component } from 'react'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import PropTypes from 'prop-types'
import {
  Table,
  TableHeader,
  Checkbox,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
  RaisedButton
} from 'material-ui'

import RevokeAdminDialog from '../../containers/admin/dialogs/revokeAdminDialog'
import './style.css'

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

  componentWillMount() {
    const { fetchAllUsers } = this.props

    fetchAllUsers()
  }

  renderUserRows() {
    const {
      users,
      toggleUserVisibility,
      toggleUserSuperAdmin,
      openDialog
    } = this.props

    return users.map(user => {
      const { id, firstName, email, lastName, visible, role } = user

      const blockedCheckbox = (
        <Checkbox
          checked={!visible}
          onCheck={() => toggleUserVisibility(id, visible)}
        />
      )

      const superAdminCheckbox = (
        <Checkbox
          checked={role === 'super_admin'}
          onCheck={() => toggleUserSuperAdmin(id, role)}
        />
      )

      const revokeAdminButton = (
        <RaisedButton
          disabled={role !== 'admin'}
          backgroundColor="#8195b1"
          label="Revoke"
          onClick={() =>
            openDialog(3, {
              message: `Revoke admin status for ${firstName} ${lastName}`,
              userId: id
            })
          }
        />
      )

      return (
        <TableRow key={id}>
          <TableRowColumn>
            {firstName} {lastName}
          </TableRowColumn>
          <TableRowColumn>{email}</TableRowColumn>
          <TableRowColumn>{blockedCheckbox}</TableRowColumn>
          <TableRowColumn>{superAdminCheckbox}</TableRowColumn>
          <TableRowColumn>{revokeAdminButton}</TableRowColumn>
        </TableRow>
      )
    })
  }

  renderUserTable() {
    const headerValues = [
      { tooltip: 'Full Name', value: 'Name' },
      { tooltip: 'Email', value: 'Email' },
      { tooltip: 'Block/Unblock', value: 'Blocked' },
      { tooltip: 'Is Super Admin', value: 'Super Admin' },
      { tooltip: 'Revoke org/prog admin access', value: 'Revoke Admin' }
    ]

    const mapHeaderValues = headerValues.map(({ tooltip, value }) => (
      <TableHeaderColumn key={value} tooltip={tooltip}>
        {value}
      </TableHeaderColumn>
    ))

    return (
      <div className="table-container">
        <RevokeAdminDialog />
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
        <h1 className="admin-title">Users</h1>
        {this.renderUserTable()}
      </MuiThemeProvider>
    )
  }
}

UserTable.propTypes = {
  fetchAllUsers: PropTypes.func.isRequired,
  toggleUserVisibility: PropTypes.func.isRequired,
  toggleUserSuperAdmin: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired // eslint-disable-line
}
