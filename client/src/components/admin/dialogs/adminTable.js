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

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#ea4e46'
  }
})

export default class AdminTable extends Component {
  constructor(props) {
    super(props)

    this.renderTable = this.renderTable.bind(this)
    this.renderRows = this.renderRows.bind(this)
  }

  componentWillMount() {
    const { type, typeId, fetchTypePermissions } = this.props

    fetchTypePermissions(type, typeId)
  }

  renderRows() {
    const { admins, typeId, type, revokeAdmin } = this.props

    return admins.map(admin => {
      const { id, firstName, email, lastName } = admin

      const revokeAdminButton = (
        <RaisedButton
          backgroundColor="#8195b1"
          label="Revoke"
          onClick={() => revokeAdmin(id, type, typeId)}
        />
      )

      return (
        <TableRow key={id}>
          <TableRowColumn>
            {firstName} {lastName}
          </TableRowColumn>
          <TableRowColumn>{email}</TableRowColumn>
          <TableRowColumn>{revokeAdminButton}</TableRowColumn>
        </TableRow>
      )
    })
  }

  renderTable() {
    const headerValues = [
      { tooltip: 'Full Name', value: 'Name' },
      { tooltip: 'Email', value: 'Email' },
      { tooltip: 'Revoke', value: 'Revoke' }
    ]

    const mapHeaderValues = headerValues.map(({ tooltip, value }) => (
      <TableHeaderColumn key={value} tooltip={tooltip}>
        {value}
      </TableHeaderColumn>
    ))

    return (
      <div>
        <Table height="300px">
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>{mapHeaderValues}</TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows>
            {this.renderRows()}
          </TableBody>
        </Table>
      </div>
    )
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {this.renderTable()}
      </MuiThemeProvider>
    )
  }
}

AdminTable.propTypes = {
  admins: PropTypes.array.isRequired, // eslint-disable-line
  typeId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  revokeAdmin: PropTypes.func.isRequired,
  fetchTypePermissions: PropTypes.func.isRequired
}
