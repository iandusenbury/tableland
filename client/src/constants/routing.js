import ConnectedAdminPage from '../containers/admin'
import Home from '../components/home'
import About from '../components/about'
import SearchResults from '../containers/searchResults'
import OrgPage from '../containers/organization'
import ProfPage from '../containers/professional'
import EditProfile from '../components/edit'
import EditOrg from '../components/editOrganization'

export const routePathToComponent = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'About',
    path: '/about',
    component: About
  },
  {
    name: 'AdminPage',
    path: '/admin',
    component: ConnectedAdminPage
  },
  {
    name: 'SearchResults',
    path: '/results',
    component: SearchResults
  },
  {
    name: 'OrganizationPage',
    path: '/organization',
    component: OrgPage
  },
  {
    name: 'ProfessionalPage',
    path: '/profile',
    component: ProfPage
  },
  {
    name: 'EditProfile',
    path: '/edit',
    component: EditProfile
  },
  {
    name: 'EditOrg',
    path: '/editOrganization',
    component: EditOrg
  }
]

/* eslint no-param-reassign: ["error", { "props": false }] */
export const routePaths = routePathToComponent.reduce((obj, item) => {
  obj[item.name] = item.path // Linter exception for this line
  return obj
}, {})

export default {
  routePathToComponent,
  routePaths
}
