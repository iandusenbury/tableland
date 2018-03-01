import React from 'react'
import { Route } from 'react-router-dom'

import Navbar from '../../containers/navbar'
import { routePathToComponent } from '../../constants/routing'
import Dialog from '../../containers/dialog'

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
    <Dialog />
    <main>{renderRoutes()}</main>
  </div>
)

export default App
