import React from 'react'
import { Link } from 'react-router-dom'
import {
  IconMenu,
  IconButton,
  MenuItem,
  FlatButton,
  Divider,
  Toolbar,
  ToolbarGroup
} from 'material-ui'
import PropTypes from 'prop-types'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/menu'
import muiThemeable from 'material-ui/styles/muiThemeable'
import NavbarForm from './navbarForm'
import styles from '../../constants/styles'
import './style.css'

import { mesaMenuButton, navbarPaths } from '../../constants/navbar'

/*
   [Hamburger Menu] (if signed in)
   "View Profile"
   "Edit Profile"
   "View Admin" (if admin)
   "Sign Out"
   "About"
*/
const Navbar = props => {
  const { authorizeUser, fetchUser, logoutUser, fetchResults } = props

  return (
    <header>
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup>
          <FlatButton
            containerElement={<Link to={mesaMenuButton.path} />}
            label={mesaMenuButton.label}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <NavbarForm onSubmit={fetchResults} />
          <IconMenu
            iconButtonElement={
              <IconButton touch>
                <NavigationExpandMoreIcon />
              </IconButton>
            }>
            <MenuItem
              onClick={() => authorizeUser()}
              value="sign_in"
              primaryText="Sign In"
            />
            <MenuItem
              onClick={() => fetchUser()}
              value="fetch_user"
              primaryText="Fetch User"
            />
            <MenuItem
              onClick={() => logoutUser()}
              value="logout_user"
              primaryText="Logout"
            />
            <Divider />
            <MenuItem
              containerElement={<Link to={navbarPaths.view_profile.path} />}
              value={navbarPaths.view_profile.value}
              primaryText={navbarPaths.view_profile.primaryText}
            />
            <MenuItem
              containerElement={<Link to={navbarPaths.edit_profile.path} />}
              value={navbarPaths.edit_profile.value}
              primaryText={navbarPaths.edit_profile.primaryText}
            />
            <MenuItem
              containerElement={<Link to={navbarPaths.admin_page.path} />}
              value={navbarPaths.admin_page.value}
              primaryText={navbarPaths.admin_page.primaryText}
            />
            <MenuItem
              containerElement={<Link to={navbarPaths.sign_out.path} />}
              value={navbarPaths.sign_out.value}
              primaryText={navbarPaths.sign_out.primaryText}
            />
            <MenuItem
              containerElement={<Link to={navbarPaths.about.path} />}
              value={navbarPaths.about.value}
              primaryText={navbarPaths.about.primaryText}
            />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    </header>
  )
}

Navbar.propTypes = {
  authorizeUser: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired
}

export default muiThemeable()(Navbar)
