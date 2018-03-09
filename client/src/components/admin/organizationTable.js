import React, { Component } from 'react'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import { Link } from 'react-router-dom'
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

import AddAdminDialog from '../../containers/admin/dialogs/addAdminDialog'

import './style.css'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#ea4e46'
  }
})

export default class OrganizationList extends Component {
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
    const {
      organizations,
      toggleOrganizationVisibility,
      openDialog
    } = this.props

    return organizations.map(organization => {
      const { id, name, visible } = organization

      const blockedCheckbox = (
        <Checkbox
          checked={!visible}
          onCheck={() => toggleOrganizationVisibility(id, visible)}
        />
      )

      const editOrganizationButton = (
        <RaisedButton
          backgroundColor="#8195b1"
          label="Edit"
          containerElement={<Link to={`/organization/edit/${id}`} />}
        />
      )
      const addAdminButton = (
        <RaisedButton
          backgroundColor="#8195b1"
          label="Add Admin"
          onClick={() =>
            openDialog(2, {
              message: `Add Admin to ${name}`,
              organizationId: id
            })
          }
        />
      )

      return (
        <TableRow key={id}>
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>{blockedCheckbox}</TableRowColumn>
          <TableRowColumn>{editOrganizationButton}</TableRowColumn>
          <TableRowColumn>{addAdminButton}</TableRowColumn>
        </TableRow>
      )
    })
  }

  renderOrganizationTable() {
    const headerValues = [
      { tooltip: 'Name', value: 'Name' },
      { tooltip: 'Block/Unblock', value: 'Blocked' },
      { tooltip: 'Edit org/prog', value: '' },
      { tooltip: 'Add admin to org/prog', value: '' }
    ]

    const mapHeaderValues = headerValues.map(({ tooltip, value }) => (
      <TableHeaderColumn key={value} tooltip={tooltip}>
        {value}
      </TableHeaderColumn>
    ))

    return (
      <div>
        <AddAdminDialog />
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
      </div>
    )
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <h1 className="admin-title">Organizations</h1>
        {this.renderOrganizationTable()}
      </MuiThemeProvider>
    )
  }
}

OrganizationList.propTypes = {
  fetchAllOrganizations: PropTypes.func.isRequired,
  toggleOrganizationVisibility: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  organizations: PropTypes.array.isRequired // eslint-disable-line
}
