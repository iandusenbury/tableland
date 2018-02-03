import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Users from './users'
import {
  adminChangeTableTo,
  adminChangeAdminTo,
} from '../../actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import {
  Paper,
  Menu,
  MenuItem,
} from 'material-ui'

import './style.css'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#bed62f',
  },
  menuItem: {
    hoverColor: '#bed62f'
  }
});

class AdminPage extends Component {
  constructor(props) {
    super(props)

    this.renderAdminList = this.renderAdminList.bind(this)
    this.renderAdminMenu = this.renderAdminMenu.bind(this)
    this.renderAdminSection = this.renderAdminSection.bind(this)
  }

  renderAdminMenu() {
    const {
      isAdmin,
      tables,
      adminChangeTableTo,
    } = this.props

    if(isAdmin) {
      const adminMenu = tables.map((table) => {
        const {
          title,
          id,
          buttonIcon,
        } = table

        return (
          <MenuItem
            className='menu-bar-item'
            primaryText={title}
            onClick={() => adminChangeTableTo(id)}
            leftIcon={buttonIcon}
          />
        )
      })

      return (
        <Paper className='menu-bar' zDepth={2}>
          <Menu>
            { adminMenu }
          </Menu>
        </Paper>
      )
    }
  }

  renderAdminList() {
    const {
      currentTable,
      isAdmin,
      adminChangeTableTo,
    } = this.props

    const {
      title,
      list,
      button1,
      button2,
    } = currentTable

    const adminList = () => {
      if(!(isAdmin)) {
        adminChangeTableTo(2) // Hack, for now. This wont get rerendered if non-admin.
      }

      return (
        <Users
          title={title}
          users={list}
          button1={button1}
          button2={button2}
        />
      )
    }

    return adminList()
  }

  renderAdminSection() {
    const { isAdmin } = this.props

    if(isAdmin) {
      return (
        <div className='admin-section'>
          { this.renderAdminMenu() }
          { this.renderAdminList() }
        </div>
      )
    }

    return (
      <div className='non-admin-section'>
        { this.renderAdminMenu() }
        { this.renderAdminList() }
      </div>
    )
  }

  render() {
    const { adminChangeAdminTo } = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <h1>Admin Page</h1>
          { this.renderAdminSection() }
        <div className='test-buttons'>
          <button onClick={() => adminChangeAdminTo(true)}>TEST: Switch to Admin View</button>
          <button onClick={() => adminChangeAdminTo(false)}>TEST: Switch to Non Admin View</button>
        </div>
      </MuiThemeProvider>
    )
  }
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
