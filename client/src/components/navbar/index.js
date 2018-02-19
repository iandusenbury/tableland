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
  ToolbarGroup
} from 'material-ui'

import PropTypes from 'prop-types'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/menu'

const Navbar = props => {
  const { authorizeUser } = props

  return (
    <header>
      <Toolbar>
        <ToolbarGroup>
          <FlatButton containerElement={<Link to="/" />} label="MESA" />
        </ToolbarGroup>
        <ToolbarGroup>
          <TextField hintText="Search" />
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
            <Divider />
            <MenuItem
              containerElement={<Link to="/" />}
              value="view_profile"
              primaryText="View Profile"
            />
            <MenuItem
              containerElement={<Link to="/" />}
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
  authorizeUser: PropTypes.func.isRequired
}

export default Navbar
