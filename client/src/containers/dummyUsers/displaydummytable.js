import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  Avatar,
  FlatButton,
} from 'material-ui'

class DisplayDummyTable extends Component {
  constructor(props) {
    super(props)

    this.renderTableRows = this.renderTableRows.bind(this)
  }

  renderTableRows() {
    const { users } = this.props  // Extract users array from props

    const tableRows = users.map((user) => {
      const {
        id,
        firstName,
        lastName,
        email,
        currentOccupation,
      } = user                // Extract information from each user

      return (
        <TableRow
          className='table-row-stripe'
          key={id}
        >
          <TableRowColumn className='table-cell'>
            <div className='table-name table-border'>
              <h2>{firstName} {lastName}</h2>
            </div>
            <div className='table-icon table-border'>
              <div className='table-avatar'>
                <Avatar
                  size={60}
                  src={require('./portrait.png')}
                />
              </div>
              <FlatButton
                className='table-flatbutton'
                hoverColor={'#e7e0d7'}
              >
                View profile
              </FlatButton>
            </div>
            <div className='table-about'>
              <ul>
                <li>Working as/at: {currentOccupation}</li>
              </ul>
            </div>
            <ul className='table-contact'>
              <li>Contact: {email}</li>
            </ul>
          </TableRowColumn>
        </TableRow>
      )
    })

    return tableRows
  }

  render() {
    return (
      <Table selectable={false}>
        <TableBody displayRowCheckbox={false} stripedRows>
          {this.renderTableRows()}
        </TableBody>
      </Table>
    )
  }
}

export default connect(
)(DisplayDummyTable)
