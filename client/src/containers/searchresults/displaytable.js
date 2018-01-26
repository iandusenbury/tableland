import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {selectUser} from '../../constants/actionTypes'
import Avatar from 'react-toolbox/lib/avatar/Avatar'
import {Table, TableCell, TableRow} from 'react-toolbox/lib/table'

class DisplayTable extends React.Component {
  render() {
    return (
      <Table selectable={false}>
      {
        this.props.users.map((user) => {
          return (
            <TableRow className='table-row' key={user.id}>
              <TableCell className='table-cell'>
                <div className='table-name'>
                  <h4>{ user.first_name } { user.last_name }</h4>
                </div>
                <div className='table-icon'>
                  <Avatar style={{height: '72px', width: '72px'}} image={require('./portrait.png')} />
                  <p onClick={() => {this.props.selectUser(user)}}>View profile</p>
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
              </TableCell>
            </TableRow>
          )
        })
      }
      </Table>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  selectUser: selectUser
}, dispatch)

export default connect(
  null,
  mapDispatchToProps,
)(DisplayTable)
