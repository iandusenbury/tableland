import React from 'react'
//	material-ui
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/menu';
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
	<div>
		<header>
			<Toolbar>
				<ToolbarGroup>
					<FlatButton 
						href="/"
						label="MESA"
						/>

				</ToolbarGroup>
				<ToolbarGroup>
					<TextField hintText="Search" />
					<RaisedButton label="Search" />
					<IconMenu iconButtonElement={
						  <IconButton touch={true}>
							  <NavigationExpandMoreIcon />
						  </IconButton>
					}>
						<MenuItem href="" value="sign_in" primaryText="Sign In" />
						<Divider />
						<MenuItem href="" value="view_profile" primaryText="View Profile" />
						<MenuItem href="" value="edit_profile" primaryText="Edit Profile" />
						<MenuItem href="" value="admin_page" primaryText="Admin Page" />
						<Divider />
						<MenuItem href="" value="sign_out" primaryText="Sign Out" />
						<MenuItem href="/about-us" value="about" primaryText="About" />
					</IconMenu>
				</ToolbarGroup>
			</Toolbar>
		</header>
	</div>
);
