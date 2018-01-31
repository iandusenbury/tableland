import React from 'react'
import { Route, Link } from 'react-router-dom'
import About from '../about'
//	material-ui
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'

import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/menu'
// figure out how to get a MESA icon
//import MESAIcon from 'material-ui/svg-icons/custom/MESAIcon.svg'

// layout should be
/*
	 M(icon/link)	[Search Bar] [Submit Button] [Hamburger Menu]

	 [Hamburger Menu] (if not signed in)
	 "Sign In"
	 "About"

	 [Hamburger Menu] (if signed in)
	 "View Profile"
	 "Edit Profile"
	 "View Admin"	(if admin)
	 "Sign Out"
	 "About"
*/
export default () => (
	<header>
		<Toolbar>
			<ToolbarGroup>
				<FlatButton 
					containerElement={<Link to="/" />}
					label="MESA" />

			</ToolbarGroup>
			<ToolbarGroup>
				<TextField hintText="Search" />
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
