import React, { Component } from 'react'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import {
  Table,
  TableHeader,
  Checkbox,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
  FlatButton,
  RaisedButton,
  AutoComplete
} from 'material-ui'

import PropTypes from 'prop-types'

import './style.css'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#bed62f'
  },
  menuItem: {
    hoverColor: '#bed62f'
  }
})

export default class UserList extends Component {
  constructor(props) {
    super(props)

    // this.renderAdminList = this.renderAdminList.bind(this)
    // this.renderAdminMenu = this.renderAdminMenu.bind(this)
    // this.renderAdminSection = this.renderAdminSection.bind(this)
    this.renderUserTable = this.renderUserTable.bind(this)
    this.renderUserRows = this.renderUserRows.bind(this)
  }

  componentWillMount() {
    const { fetchAllUsers } = this.props

    fetchAllUsers()
  }

  renderUserRows() {
    const { users, toggleUserVisibility } = this.props

    return users.map(user => {
      const {
        id,
        firstName,
        email,
        lastName,
        visible
      } = user

      const blockedCheckbox = (
        <Checkbox checked={!visible} onCheck={() => toggleUserVisibility(id, visible)} />
      )

      const rowButton1 = (
        <TableRowColumn>
          <RaisedButton backgroundColor="#bed62f" label="button1" />
        </TableRowColumn>
      )
      const rowButton2 = (
        <TableRowColumn>
          <FlatButton
            style={{ color: 'red' /* Override text color inside FlatButton */ }}
            label="button2"
          />
        </TableRowColumn>
      )

      return (
        <TableRow key={id}>
          <TableRowColumn>
            {firstName} {lastName}
          </TableRowColumn>
          <TableRowColumn>{blockedCheckbox}</TableRowColumn>
          {rowButton1}
          {rowButton2}
        </TableRow>
      )
    })
  }

  renderUserTable() {
    return (
      <div className="table-container">
        <Table height="300px">
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn tooltip="Full Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Block/Unblock">
                B/UB
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Make Super Admin">
                SA
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Un-adminize">DE</TableHeaderColumn>
            </TableRow>
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

UserList.propTypes = {
  fetchAllUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
  // isAdmin: PropTypes.bool.isRequired,
  // tables: PropTypes.element.isRequired,
  // currentTable: PropTypes.element.isRequired,
  // adminChangeTableTo: PropTypes.func.isRequired,
  // adminChangeAdminTo: PropTypes.func.isRequired
}
