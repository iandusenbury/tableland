import React, { Component } from 'react'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import PropTypes from 'prop-types'

import UserTable from '../../containers/admin/userTable'
import OrganizationTable from '../../containers/admin/organizationTable'

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
  render() {
    const { isSuperAdmin } = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <h1 className="admin-title">Admin Center</h1>
        <UserTable />
        <OrganizationTable />
      </MuiThemeProvider>
    )
  }
}

AdminPage.propTypes = {
  isSuperAdmin: PropTypes.bool.isRequired
}
