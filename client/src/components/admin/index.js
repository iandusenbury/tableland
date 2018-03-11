import React, { Component } from 'react'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import PropTypes from 'prop-types'
import { Tabs, Tab, Paper } from 'material-ui'

import UserTable from '../../containers/admin/userTable'
import OrganizationTable from '../../containers/admin/organizationTable'
import ProgramTable from '../../containers/admin/programTable'

import './style.css'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#ea4e46'
  }
})

class AdminPage extends Component {
  componentWillMount() {
    const { fetchUserPermissions } = this.props

    fetchUserPermissions()
  }

  render() {
    const { isSuperAdmin } = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="table-container">
          <h1 className="admin-title">Admin Center</h1>
          <Paper>
            <Tabs>
              {isSuperAdmin && (
                <Tab label="Users">
                  <UserTable />
                </Tab>
              )}
              <Tab label="Organizations">
                <OrganizationTable />
              </Tab>
              <Tab label="Programs">
                <ProgramTable />
              </Tab>
            </Tabs>
          </Paper>
        </div>
      </MuiThemeProvider>
    )
  }
}

AdminPage.propTypes = {
  isSuperAdmin: PropTypes.bool.isRequired
}

export default AdminPage
