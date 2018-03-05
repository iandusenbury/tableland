import React from 'react'
import { Route, Switch } from 'react-router-dom'

// import { routePathToComponent } from '../../constants/routing'
import PrivateRoute from '../../containers/privateRoute'
import Navbar from '../../containers/navbar'
import Dialog from '../../containers/dialog'

// routes
import Admin from '../../containers/admin'
import Home from '../home'
import About from '../about'
import SearchResults from '../searchResults'
import OrgPage from '../organization'
import EditProfile from '../edit'
import ProfPage from '../professional'
import NotFound from '../notFound'

const App = () => (
  <div>
    <Navbar />
    <Dialog />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <PrivateRoute exact path="/admin" component={Admin} />
      <Route exact path="/results" component={SearchResults} />
      <Route exact path="/organization/:id" component={OrgPage} />
      <Route exact path="/profile/:id" component={ProfPage} />
      <Route exact path="/edit" component={EditProfile} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
