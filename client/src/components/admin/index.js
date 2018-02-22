import React, { Component } from 'react'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import { Paper, Menu, MenuItem } from 'material-ui'
import PropTypes from 'prop-types'

import Users from './users'

import './style.css'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#bed62f'
  },
  menuItem: {
    hoverColor: '#bed62f'
  }
})

export default class AdminPage extends Component {
  constructor(props) {
    super(props)

    this.renderAdminList = this.renderAdminList.bind(this)
    this.renderAdminMenu = this.renderAdminMenu.bind(this)
    this.renderAdminSection = this.renderAdminSection.bind(this)
  }

  renderAdminMenu() {
    const { isAdmin, tables, adminChangeTableTo } = this.props

    if (isAdmin) {
      const adminMenu = tables.map(table => {
        const { title, id, buttonIcon } = table

        return (
          <MenuItem
            className="admin-menu-bar-item"
            primaryText={title}
            onClick={() => adminChangeTableTo(id)}
            rightIcon={buttonIcon}
          />
        )
      })

      return (
        <Paper className="admin-menu-bar" zDepth={2}>
          <Menu>{adminMenu}</Menu>
        </Paper>
      )
    }

    return ''
  }

  renderAdminList() {
    const { currentTable, isAdmin, adminChangeTableTo } = this.props

    const { title, list, button1, button2 } = currentTable

    const adminList = () => {
      if (!isAdmin) {
        adminChangeTableTo(2) // Hack, for now. This wont get rerendered if non-admin.
      }

      return (
        <Users title={title} users={list} button1={button1} button2={button2} />
      )
    }

    return adminList()
  }

  renderAdminSection() {
    const { isAdmin } = this.props

    if (isAdmin) {
      return (
        <div className="admin-section">
          {this.renderAdminMenu()}
          {this.renderAdminList()}
        </div>
      )
    }

    return (
      <div className="non-admin-section">
        {this.renderAdminMenu()}
        {this.renderAdminList()}
      </div>
    )
  }

  render() {
    const { adminChangeAdminTo } = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <h1 className="admin-title">Admin Page</h1>
        {this.renderAdminSection()}
        <div className="test-buttons">
          <button onClick={() => adminChangeAdminTo(true)}>
            TEST: Switch to Admin View
          </button>
          <button onClick={() => adminChangeAdminTo(false)}>
            TEST: Switch to Non Admin View
          </button>
        </div>
      </MuiThemeProvider>
    )
  }
}

AdminPage.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  tables: PropTypes.element.isRequired,
  currentTable: PropTypes.element.isRequired,
  adminChangeTableTo: PropTypes.func.isRequired,
  adminChangeAdminTo: PropTypes.func.isRequired
}
