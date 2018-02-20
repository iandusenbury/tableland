import React from 'react'
import { Route } from 'react-router-dom'

import Navbar from '../../containers/navbar'
import { routePathToComponent } from '../../constants/routing'

const renderRoutes = () => {
  const routes = routePathToComponent.map(route => {
    const { name, path, component } = route
    return <Route key={name} exact path={path} component={component} />
  })
  return routes
}

const App = () => (
  <div>
    <Navbar />
    <main>{renderRoutes()}</main>
  </div>
)

export default App
