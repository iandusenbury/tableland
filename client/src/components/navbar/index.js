import React from 'react'
import { Link } from 'react-router-dom'
//  import material-ui components
import {
  IconMenu,
  IconButton,
  MenuItem,
  RaisedButton,
  FlatButton,
  Divider,
  TextField,
  Toolbar,
  ToolbarGroup,
  Chip
} from 'material-ui'
import PropTypes from 'prop-types'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/menu'
import muiThemeable from 'material-ui/styles/muiThemeable'

import styles from '../../constants/styles'

/*
   [Hamburger Menu] (if signed in)
   "View Profile"
   "Edit Profile"
   "View Admin" (if admin)
   "Sign Out"
   "About"
*/
const Navbar = props => {
  const { authorizeUser, fetchUser } = props

  return (
    <header>
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup>
          <FlatButton containerElement={<Link to="/" />} label="MESA" />
        </ToolbarGroup>
        <ToolbarGroup>
          <Chip style={styles.chip}>
            <TextField hintText="Search" />
          </Chip>
          <RaisedButton label="Search" />
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
            <Divider />
            <MenuItem
              containerElement={<Link to="/" />}
              value="view_profile"
              primaryText="View Profile"
            />
            <MenuItem
                  containerElement={<Link to="/edit" />}
                  value="edit_profile"
                  primaryText="Edit Profile"
            />
            <MenuItem
              containerElement={<Link to="/admin" />}
              value="admin_page"
              primaryText="Admin Page"
            />
            <Divider />
            <MenuItem
              containerElement={<Link to="/" />}
              value="sign_out"
              primaryText="Sign Out"
            />
            <MenuItem
              containerElement={<Link to="/about-us" />}
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
  fetchUser: PropTypes.func.isRequired
}

export default muiThemeable()(Navbar)
