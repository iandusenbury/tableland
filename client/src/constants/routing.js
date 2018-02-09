import ConnectedAdminPage from '../containers/admin'
import ConnectedHome from '../components/home'
import ConnectedAbout from '../components/about'
import ConnectedSearchResults from '../components/searchResults'

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
  }
]

export default {
  routePathToComponent
}
