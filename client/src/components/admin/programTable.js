import React, { Component } from 'react'
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
import AdminPermissionsDialog from '../../containers/admin/dialogs/adminPermissionsDialog'

const truncate = string => {
  const maxLen = 14
  if (string.length <= maxLen) return string

  return `${string.substring(0, maxLen)}...`
}

export default class ProgramList extends Component {
  constructor(props) {
    super(props)

    this.renderRows = this.renderRows.bind(this)
    this.renderTable = this.renderTable.bind(this)
  }

  renderRows() {
    const { programs, toggleProgramVisibility, openDialog } = this.props

    return programs.map(program => {
      const { id, name, visible, parentOrganizationNames } = program
      const mappedNames = parentOrganizationNames.map(org => {
        const [orgName, orgAddressLine1, orgAddressLine2] = org

        return `${orgName} ${orgAddressLine1} ${orgAddressLine2}`
      })

      const blockedCheckbox = (
        <Checkbox
          checked={!visible}
          onCheck={() => toggleProgramVisibility(id, visible)}
        />
      )

      const editProgramButton = (
        <RaisedButton
          backgroundColor="#8195b1"
          label="Edit"
          containerElement={<Link to={`/program/edit/${id}`} />}
        />
      )

      const addAdminButton = (
        <RaisedButton
          backgroundColor="#8195b1"
          label="Add Admin"
          onClick={() =>
            openDialog(2, {
              message: `Add Admin to ${name}`,
              type: 'programs',
              typeId: id
            })
          }
        />
      )

      const viewAdminListButton = (
        <RaisedButton
          backgroundColor="#8195b1"
          label="View"
          onClick={() =>
            openDialog(4, {
              message: `Showing admins for ${name}`,
              type: 'programs',
              typeId: id
            })
          }
        />
      )

      return (
        <TableRow key={id}>
          <TableRowColumn>{name}</TableRowColumn>
          <TableHeaderColumn tooltip={mappedNames.join()}>
            {truncate(mappedNames.join())}
          </TableHeaderColumn>
          <TableRowColumn>{blockedCheckbox}</TableRowColumn>
          <TableRowColumn>{editProgramButton}</TableRowColumn>
          <TableRowColumn>{viewAdminListButton}</TableRowColumn>
          <TableRowColumn>{addAdminButton}</TableRowColumn>
        </TableRow>
      )
    })
  }

  renderTable() {
    const headerValues = [
      { tooltip: 'Name', value: 'Name' },
      { tooltip: 'Associated Organizations', value: 'Assoc Orgs' },
      { tooltip: 'Block/Unblock', value: 'Blocked' },
      { tooltip: 'Goto edit page', value: 'Edit' },
      { tooltip: 'View/Edit admins', value: 'Admins' }
    ]

    const mapHeaderValues = headerValues.map(({ tooltip, value }) => (
      <TableHeaderColumn key={value} tooltip={tooltip}>
        {value}
      </TableHeaderColumn>
    ))

    return (
      <div>
        <AddAdminDialog />
        <AdminPermissionsDialog />
        <Table fixedHeader={false} style={{ tableLayout: 'auto' }}>
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
    return <div>{this.renderTable()}</div>
  }
}

ProgramList.propTypes = {
  toggleProgramVisibility: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  programs: PropTypes.array.isRequired // eslint-disable-line
}
