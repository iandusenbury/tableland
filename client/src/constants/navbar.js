import { routePaths } from './routing'

export const mesaMenuButton = {
  path: routePaths.Home,
  label: 'MESA'
}

export const navbarMenuPaths = [
  { path: routePaths.Home, value: 'view_profile', primaryText: 'View Profile' },
  {
    path: routePaths.EditProfile,
    value: 'edit_profile',
    primaryText: 'Edit Profile'
  },
  {
    path: routePaths.AdminPage,
    value: 'admin_page',
    primaryText: 'Admin Page'
  },
  { path: routePaths.Home, value: 'sign_out', primaryText: 'Sign Out' },
  { path: routePaths.About, value: 'about', primaryText: 'About' }
]

/* eslint no-param-reassign: ["error", { "props": false }] */
export const navbarPaths = navbarMenuPaths.reduce((obj, item) => {
  obj[item.value] = item // Linter exception for this line
  return obj
}, {})

export default {
  navbarPaths,
  mesaMenuButton,
  navbarMenuPaths
}
