import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Users from './users'
import { adminChangeTableTo, adminChangeAdminTo } from '../../actions'

import {
  Paper,
  Menu,
  MenuItem,
} from 'material-ui'

import './style.css'

const AdminPage = props => {
  let page
  let menu

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
        <Users
          title={currentTable.title}
          users={currentTable.list}
          button1={currentTable.button1}
          button2={currentTable.button2}
        />
      </div>
    )
    menu = (
      <Menu>
        {
          tables.map((table) => {
            return (
              <MenuItem
                primaryText={table.title}
                onClick={() => adminChangeTableTo(table.id)}
              />
            )
          })
        }
      </Menu>
    )
  } else {
    adminChangeTableTo(2) // Hack, for now
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
      <div className='menu-bar'>
        <Paper zDepth={0}>
          { menu }
        </Paper>
      </div>
      { page }
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
