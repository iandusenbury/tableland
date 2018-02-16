import ConnectedAdminPage from '../containers/admin'
import ConnectedHome from '../components/home'
import ConnectedAbout from '../components/about'
import ConnectedSearchResults from '../components/searchResults'
import OrgPage from '../components/organization'
import ProfPage from '../components/professional'

export const routePathToComponent = [
  {
    name: 'Home',
    path: '/',
    component: ConnectedHome
  },
  {
    name: 'About',
    path: '/about-us',
    component: ConnectedAbout
  },
  {
    name: 'AdminPage',
    path: '/admin',
    component: ConnectedAdminPage
  },
  {
    name: 'SearchResults',
    path: '/results',
    component: ConnectedSearchResults
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
  }
]

export default {
  routePathToComponent
}
