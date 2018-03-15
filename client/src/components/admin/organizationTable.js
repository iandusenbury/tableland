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

export default class OrganizationList extends Component {
  constructor(props) {
    super(props)

    this.renderRows = this.renderRows.bind(this)
    this.renderTable = this.renderTable.bind(this)
  }

  renderRows() {
    const {
      organizations,
      toggleOrganizationVisibility,
      openDialog
    } = this.props

    return organizations.map(organization => {
      const { id, name, addressLine1, addressLine2, visible } = organization

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
              type: 'organizations',
              typeId: id
            })
          }
        />
      )

      return (
        <TableRow key={id}>
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>{`${addressLine1} ${addressLine2}`}</TableRowColumn>
          <TableRowColumn>{blockedCheckbox}</TableRowColumn>
          <TableRowColumn>{editOrganizationButton}</TableRowColumn>
          <TableRowColumn>{addAdminButton}</TableRowColumn>
        </TableRow>
      )
    })
  }

  renderTable() {
    const headerValues = [
      { tooltip: 'Name', value: 'Name' },
      { tooltip: 'Address', value: 'Address' },
      { tooltip: 'Block/Unblock', value: 'Blocked' }
    ]

    const mapHeaderValues = headerValues.map(({ tooltip, value }) => (
      <TableHeaderColumn key={value} tooltip={tooltip}>
        {value}
      </TableHeaderColumn>
    ))

    return (
      <div>
        <AddAdminDialog />
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

OrganizationList.propTypes = {
  toggleOrganizationVisibility: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  organizations: PropTypes.array.isRequired // eslint-disable-line
}
