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

export default class RevokeAdminList extends Component {
  constructor(props) {
    super(props)

    this.renderOrganizationTable = this.renderOrganizationTable.bind(this)
    this.renderOrganizationRows = this.renderOrganizationRows.bind(this)
  }

  componentWillMount() {
    const { userId, fetchUserAdminPermissions } = this.props
    fetchUserAdminPermissions(userId)
  }

  renderOrganizationRows() {
    const { organizations, userId, revokeOrganizationAdmin } = this.props

    return organizations.map(organization => {
      const { id, name } = organization

      const revokeAdminButton = (
        <RaisedButton
          backgroundColor="#8195b1"
          label="Revoke"
          onClick={() => revokeOrganizationAdmin(id, userId)}
        />
      )

      return (
        <TableRow key={id}>
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>{revokeAdminButton}</TableRowColumn>
        </TableRow>
      )
    })
  }

  renderOrganizationTable() {
    const headerValues = [
      { tooltip: 'Name', value: 'Name' },
      { tooltip: 'Revoke admin access', value: '' }
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
            {this.renderOrganizationRows()}
          </TableBody>
        </Table>
      </div>
    )
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {this.renderOrganizationTable()}
      </MuiThemeProvider>
    )
  }
}

RevokeAdminList.propTypes = {
  organizations: PropTypes.array.isRequired, // eslint-disable-line
  userId: PropTypes.number.isRequired,
  revokeOrganizationAdmin: PropTypes.func.isRequired,
  fetchUserAdminPermissions: PropTypes.func.isRequired
}
