import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Input from 'react-toolbox/lib/input/Input'
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table'
import Button from 'react-toolbox/lib/button/Button'
import { dummyList } from './dummies'
import Users from './users'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
require('./style.css')

const userTables = [
  {
    id: 0,
    title: 'New Users',
    list: dummyList,
    button1: 'Approve',
    button2: 'Deny',
  },
  {
    id: 1,
    title: 'Remove Users',
    list: dummyList,
    button1: 'Block',
    button2: 'Unblock',
  },
  {
    id: 2,
    title: 'Elevate Users',
    list: dummyList,
    button1: 'Elevate',
    button2: 'Remove',
  },
]

/*
    Purpose: Allow user/admin access to the list of profiles in the database.

    Features:
    - Menu Bar. The user can select which list to view, the new users, remove
    users, and elevate users.
    - Search Bar. The user can filter through the list if needed based on
    TODO(first and last name, id, ...?).
      - The list will be updated upon...?
        - Enter
      - The search text will be cleared after Selection or Enter
    - Table List. Each entry will display identifying information about a
    profile. Each row will have buttons:
      - View profile in new tab
      - Confirm a positive action (ex: "Allow")
      - Confirm a negative action (ex: "Deny")
*/

class AdminPage extends React.Component {
  constructor() {
    super()
    this.state = {
      userTables: userTables[0],
      isAdmin: true,
      nonAdminList: userTables[2],
    }
  }

  switchPage(table) {
    return (
      this.setState({userTables: userTables[table.id]}) // Bad, don't do this
    )
  }

  render() {
    let tables

    if(this.state.isAdmin) {
      tables = (
        <div className='table-section'>
          <Paper zDepth={0} className='menu-bar'>
            <Menu>
              <MenuItem primaryText={userTables[0].title} onClick={() => {this.switchPage(userTables[0])}}/>
              <MenuItem primaryText={userTables[1].title} onClick={() => {this.switchPage(userTables[1])}}/>
              <MenuItem primaryText={userTables[2].title} onClick={() => {this.switchPage(userTables[2])}}/>
            </Menu>
          </Paper>
          <Users
            title={this.state.userTables.title}
            users={this.state.userTables.list}
            button1={this.state.userTables.button1}
            button2={this.state.userTables.button2}
          />
          {/*
            this.state.userTables.map((userList) => {
              return (
                <Users
                  title={userList.title}
                  users={userList.list}
                  button1={userList.button1}
                  button2={userList.button2}
                />
              )
            })
          */}
        </div>
      )
    } else {
      tables = (
        <Users
          title={this.state.nonAdminList.title}
          users={this.state.nonAdminList.list}
          button1={this.state.nonAdminList.button1}
          button1={this.state.nonAdminList.button2}
        />
      )
    }

    return (
      <div>
        <h1>Admin Page</h1>
        {tables}
      </div>
    )
  }
}

export default connect (

) (AdminPage)
