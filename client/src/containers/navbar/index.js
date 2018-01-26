import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchExample } from '../../actions'

import Link from 'react-toolbox/lib/link/Link';

import { Button } from 'react-toolbox/lib/button/Button';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import Input from 'react-toolbox/lib/input/Input';


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
			<AppBar title='MESA' leftIcon='M' fixed>
				<Input type='text' label='Search' name='search' />
				<Button label='Submit' raised />
				<Navigation type='horizontal'>
					<IconMenu icon='menu'>
						<MenuItem value='sign_in' caption='Sign In' />
						<MenuDivider />
						<MenuItem value='view_profile' caption='View Profile' />
						<MenuItem value='edit_profile' caption='Edit Profile' />
						<MenuItem value='admin_page' caption='Admin Page' />
						<MenuDivider />
						<MenuItem value='sign_out' caption='Sign Out' />
						<MenuItem value='about_us' caption='About' />
					</IconMenu>
				</Navigation>
			</AppBar>
		</header>
	</div>
);
