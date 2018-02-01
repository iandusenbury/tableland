import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Input from 'react-toolbox/lib/input/Input'
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table'
import Button from 'react-toolbox/lib/button/Button'
import Users from './users'
import { adminChangeTableTo, adminChangeAdminTo } from '../../actions'

import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
require('./style.css')

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

const AdminPage = props => {
  let page
  const {
    tables,
    currentTable,
    isAdmin,
    adminChangeTableTo,
    adminChangeAdminTo,
  } = props

  if(isAdmin) {
    page = (
      <div className='table-section'>
        <Paper zDepth={0} className='menu-bar'>
          <Menu>
            <MenuItem primaryText={tables[0].title} onClick={() => adminChangeTableTo(0)}/>
            <MenuItem primaryText={tables[1].title} onClick={() => adminChangeTableTo(1)}/>
            <MenuItem primaryText={tables[2].title} onClick={() => adminChangeTableTo(2)}/>
          </Menu>
        </Paper>
        <Users
          title={currentTable.title}
          users={currentTable.list}
          button1={currentTable.button1}
          button2={currentTable.button2}
        />
      </div>
    )
  } else {
    page = (
      <Users
        title={currentTable.title}
        users={currentTable.list}
        button1={currentTable.button1}
        button2={currentTable.button2}
      />
    )
  }

  return (
    <div>
      <h1>Admin Page</h1>
      {page}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    tables: state.app.adminPage.tables,
    currentTable: state.app.adminPage.currentTable,
    isAdmin: state.app.adminPage.isAdmin,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  adminChangeTableTo,
  adminChangeAdminTo,
}, dispatch)

export default connect (
  mapStateToProps,
  mapDispatchToProps,
) (AdminPage)
