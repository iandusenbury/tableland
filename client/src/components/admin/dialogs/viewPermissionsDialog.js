import React, { Component } from 'react'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import PropTypes from 'prop-types'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui'
import Dialog from '../../../containers/dialog'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#ea4e46'
  }
})

export default class AssocOrgListDialog extends Component {
  constructor(props) {
    super(props)

    this.renderTable = this.renderTable.bind(this)
    this.renderRows = this.renderRows.bind(this)
  }

  renderRows() {
    const { parentOrganizations } = this.props

    return parentOrganizations.map(organization => {
      const [name, addressLine1, addressLine2] = organization

      return (
        <TableRow key={addressLine1}>
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>{`${addressLine1} ${addressLine2}`}</TableRowColumn>
        </TableRow>
      )
    })
  }

  renderTable() {
    const { dialogIsOpen } = this.props

    const headerValues = [
      { tooltip: 'Name', value: 'Name' },
      { tooltip: 'Address', value: 'Address' }
    ]

    const mapHeaderValues = headerValues.map(({ tooltip, value }) => (
      <TableHeaderColumn key={value} tooltip={tooltip}>
        {value}
      </TableHeaderColumn>
    ))

    return (
      <Dialog open={dialogIsOpen}>
        <Table height="300px">
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>{mapHeaderValues}</TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows>

          </TableBody>
        </Table>
      </Dialog>
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

AssocOrgListDialog.propTypes = {
  parentOrganizations: PropTypes.array.isRequired, // eslint-disable-line
  dialogIsOpen: PropTypes.func.isRequired
}
