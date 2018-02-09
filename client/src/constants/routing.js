import ConnectedAdminPage from '../containers/admin'
import ConnectedHome from '../components/home'
import ConnectedAbout from '../components/about'
import ConnectedSearchResults from '../components/searchResults'

const setupRoutes = () => {
  const routes = []

  routes['.Home'] = {
    path: '/',
    component: ConnectedHome
  }
  routes['.About'] = {
    path: '/about-us',
    component: ConnectedAbout
  }
  routes['.AdminPage'] = {
    path: '/admin',
    component: ConnectedAdminPage
  }
  routes['.SearchResults'] = {
    path: '/results',
    component: ConnectedSearchResults
  }

  return routes
}

export const routePathToComponent = setupRoutes()

export default {
  routePathToComponent
}
