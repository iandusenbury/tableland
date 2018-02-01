import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  Avatar,
  FlatButton,
} from 'material-ui'

const DisplayTable = props => {
  return (
    <Table selectable={false}>
      <TableBody displayRowCheckbox={false} stripedRows>
        {
          props.users.map((user) => {
            const isStriped = (index) => {
              if (index % 2) return '#8195b1'
              return 'white'
            }
            const isStripedButton = (index) => {
              if (!(index % 2))
              return '#f8f8f8'
            }

            return (
              <TableRow style={{backgroundColor: isStriped(user.id)}} key={user.id}>
                <TableRowColumn className='table-cell'>
                  <div className='table-name' style={{borderBottomColor: isStriped(user.id+1)}}>
                    <h2>{ user.first_name } { user.last_name }</h2>
                  </div>
                  <div className='table-icon' style={{borderRightColor: isStriped(user.id+1)}}>
                    <div style={{paddingLeft: '12px'}}>
                      <Avatar size={60} src={require('./portrait.png')} />
                    </div>
                    <FlatButton hoverColor={isStripedButton(user.id+1)} style={{float: 'left'}}>View profile</FlatButton>
                  </div>
                  <div className='table-about'>
                    <ul>
                      <li>Works at: { user.org_name }</li>
                    </ul>
                  </div>
                  <ul className='table-contact'>
                    <li>LinkedIn: { user.linkedin_id }</li>
                    <li>Contact: { user.contact_url }</li>
                  </ul>
                </TableRowColumn>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  );
}

export default connect(
)(DisplayTable)
