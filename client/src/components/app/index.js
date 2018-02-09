import React from 'react'
import { Route } from 'react-router-dom'
import Navbar from '../navbar'
import { routePathToComponent } from '../../constants/routing'

const routes = routePathToComponent

const App = () => (
  <div>
    <Navbar />
    <main>
      <Route
        exact
        path={routes['.Home'].path}
        component={routes['.Home'].component}
      />
      <Route
        exact
        path={routes['.About'].path}
        component={routes['.About'].component}
      />
      <Route
        exact
        path={routes['.AdminPage'].path}
        component={routes['.AdminPage'].component}
      />
      <Route
        exact
        path={routes['.SearchResults'].path}
        component={routes['.SearchResults'].component}
      />
    </main>
  </div>
)

export default App
