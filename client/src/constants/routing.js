import ConnectedAdminPage from '../containers/admin'
import Home from '../components/home'
import About from '../components/about'
import SearchResults from '../components/searchResults'
import OrgPage from '../components/organization'
import EditProfile from '../components/edit'
import ProfPage from '../components/professional'

export const routePathToComponent = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'About',
    path: '/about-us',
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
  }
]

/* eslint no-param-reassign: ["error", { "props": false }] */
export const routePathObj = routePathToComponent.reduce((obj, item) => {
  obj[item.name] = item // Linter exception for this line
  return obj
}, {})

export default {
  routePathToComponent,
  routePathObj
}
