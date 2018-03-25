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
  Avatar,
  Chip
} from 'material-ui'
import PropTypes from 'prop-types'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/menu'
import muiThemeable from 'material-ui/styles/muiThemeable'
import SearchBarForm from '../../containers/searchBarForm'
import styles from '../../constants/styles'
import './style.css'

import Dialog from '../../containers/dialog'

// import MESAIcon from '../../assets/images/MESA_logo.svg'
const MESAIcon = require('../../assets/images/MESA_logo_white.svg')
const MESAIconSmall = require('../../assets/images/MESA_logo_white_small.svg')
const MESAIconTiny = require('../../assets/images/MESA_logo_white_tiny.svg')
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
    signedIn,
    isAdmin
  } = props

  return (
    <header>
      <Dialog open={dialogIsOpen} />
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup style={styles.toolbarGroupLeft}>
          <img
            className='navbar-mesa-logo'
            src={MESAIcon}
            alt="Home"
            onClick={() => fetchMapProfessional('random')}
          />
          <img 
            className='navbar-mesa-logo-small' 
            src={MESAIconSmall} 
            onClick={() => fetchMapProfessional('random')}
          />
          <img 
            className='navbar-mesa-logo-tiny'
            src={MESAIconTiny} 
            onClick={() => fetchMapProfessional('random')}
          />
        </ToolbarGroup>
        <ToolbarGroup style={styles.toolbarGroupRight}>
          <SearchBarForm />
          {signedIn && (
            <Link to="/profile">
              <Avatar style={styles.avatar} size={48} src={media.image.url} />
            </Link>
          )}
          <IconMenu
            iconButtonElement={
              <IconButton touch>
                <NavigationExpandMoreIcon />
              </IconButton>
            }>
            {!signedIn && (
              <MenuItem
                onClick={() => authorizeUser()}
                value="sign_in"
                primaryText="Sign In"
              />
            )}
            {signedIn && (
              <MenuItem
                containerElement={<Link to="/profile" />}
                value="profile"
                primaryText="View Profile"
              />
            )}
            {signedIn && (
              <MenuItem
                containerElement={<Link to="/profile/edit" />}
                value="edit_profile"
                primaryText="Edit Profile"
              />
            )}
            <Divider />
            {isAdmin && (
              <MenuItem
                containerElement={<Link to="/admin" />}
                value="admin_panel"
                primaryText="Admin Panel"
              />
            )}
            {signedIn && (
              <MenuItem
                onClick={() => logoutUser()}
                value="logout_user"
                primaryText="Logout"
              />
            )}
            {signedIn && (
              <Divider />
            )}
            <MenuItem
              containerElement={<Link to="/about" />}
              value="about"
              primaryText="About"
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
