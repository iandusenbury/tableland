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
  FlatButton,
  RaisedButton,
  AutoComplete
} from 'material-ui'

import UserList from '../../containers/admin/userList'

import './style.css'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#bed62f'
  },
  menuItem: {
    hoverColor: '#bed62f'
  }
})

export default class AdminPage extends Component {
  constructor(props) {
    super(props)

    this.renderOrganizationRows = this.renderOrganizationRows.bind(this)
    this.renderOrganizationTable = this.renderOrganizationTable.bind(this)
  }

  componentWillMount() {
    const { fetchAllOrganizations } = this.props

    fetchAllOrganizations()
  }

  renderOrganizationRows() {
    const { organizations } = this.props

    return organizations.map(organization => {
      const { id, name } = organization

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
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>
            <RaisedButton backgroundColor="#8195b1" label="View" />
          </TableRowColumn>
          {rowButton1}
          {rowButton2}
        </TableRow>
      )
    })
  }

  renderOrganizationTable() {
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
            {this.renderOrganizationRows()}
          </TableBody>
        </Table>
      </div>
    )
  }

  render() {
    const { isSuperAdmin } = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <h1 className="admin-title">Admin Center</h1>
        <UserList />
        <h1 className="admin-title">Organizations</h1>
        {this.renderOrganizationTable()}
      </MuiThemeProvider>
    )
  }
}

AdminPage.propTypes = {
  isSuperAdmin: PropTypes.bool.isRequired,
  organizations: PropTypes.array.isRequired, // eslint-disable-line
  fetchAllOrganizations: PropTypes.func.isRequired
}
