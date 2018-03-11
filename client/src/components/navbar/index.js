import React from 'react'
import { Link } from 'react-router-dom'
import {
  IconMenu,
  IconButton,
  MenuItem,
  FlatButton,
  Divider,
  Toolbar,
  ToolbarGroup,
  Avatar
} from 'material-ui'
import PropTypes from 'prop-types'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/menu'
import muiThemeable from 'material-ui/styles/muiThemeable'
import SearchBarForm from '../../containers/searchBarForm'
import styles from '../../constants/styles'
import './style.css'

import { mesaMenuButton, navbarPaths } from '../../constants/navbar'
import Dialog from '../../containers/dialog'

/*
   [Hamburger Menu] (if signed in)
   "View Profile"
   "Edit Profile"
   "View Admin" (if admin)
   "Sign Out"
   "About"
*/
const Navbar = props => {
  const {
    authorizeUser,
    fetchUser,
    logoutUser,
    dialogIsOpen,
    fetchMapProfessional,
    media,
    signedIn
  } = props

  return (
    <header>
      <Dialog open={dialogIsOpen} />
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup style={styles.toolbarGroupLeft}>
          <FlatButton
            onClick={() => fetchMapProfessional('random')}
            style={styles.toolbarGroupLeft.flatButton}
            // containerElement={<Link to={mesaMenuButton.path} />}
            label={mesaMenuButton.label}
          />
        </ToolbarGroup>
        <ToolbarGroup style={styles.toolbarGroupRight}>
          <SearchBarForm />
          {signedIn && (
            <Avatar style={styles.avatar} size={48} src={media.image.url} />
          )}
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
              containerElement={<Link to="/profile" />}
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
  dialogIsOpen: PropTypes.bool.isRequired,
  fetchMapProfessional: PropTypes.func.isRequired,
  media: PropTypes.object, // eslint-disable-line
  signedIn: PropTypes.bool.isRequired
}

export default muiThemeable()(Navbar)
