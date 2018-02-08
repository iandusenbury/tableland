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
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/menu'
import muiThemeable from 'material-ui/styles/muiThemeable'

/*
 * TODO:
 *    Find out how to stretch across whole screen
*/

// figure out how to get a MESA icon
//import MESAIcon from 'material-ui/svg-icons/custom/MESAIcon.svg'

// layout should be
/*
   MESA(icon/link) [Search Bar] [Submit Button] [Hamburger Menu]

   [Hamburger Menu] (if not signed in)
   "Sign In"
   "About"

   [Hamburger Menu] (if signed in)
   "View Profile"
   "Edit Profile"
   "View Admin" (if admin)
   "Sign Out"
   "About"
*/
//export default () => (
const navbar = (props) => (
  <header>
    <Toolbar style={{ backgroundColor: props.muiTheme.palette.thermalRed }}>
      <ToolbarGroup>
        <FlatButton 
          containerElement={<Link to="/" />}
          label="MESA" />

      </ToolbarGroup>
      <ToolbarGroup>
        <Chip
          style={{ backgroundColor: props.muiTheme.palette.backgroundColor }} >
          <TextField hintText="Search" />
        </Chip>
          <RaisedButton label="Search" />
        <IconMenu iconButtonElement={
            <IconButton touch={true}>
              <NavigationExpandMoreIcon />
            </IconButton>
        }>
          <MenuItem 
            containerElement={<Link to="/" />}
            value="sign_in" 
            primaryText="Sign In" />
          <Divider />
          <MenuItem 
            containerElement={<Link to="/" />}
            value="view_profile" 
            primaryText="View Profile" />
          <MenuItem 
            containerElement={<Link to="/" />}
            value="edit_profile" 
            primaryText="Edit Profile" />
          <MenuItem 
            containerElement={<Link to="/" />}
            value="admin_page" 
            primaryText="Admin Page" />
          <Divider />
          <MenuItem 
            containerElement={<Link to="/" />}
            value="sign_out" 
            primaryText="Sign Out" />
          <MenuItem 
            containerElement={<Link to="/about-us" />}
            value="about" 
            primaryText="About" />
        </IconMenu>
      </ToolbarGroup>
    </Toolbar>
  </header>
)

export default muiThemeable()(navbar)
