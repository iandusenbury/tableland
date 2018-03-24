import React from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../containers/privateRoute'
import ProtectedRoute from '../../containers/protectedRoute'
import Navbar from '../../containers/navbar'

// routes
import Admin from '../../containers/admin'
import Home from '../home'
import About from '../about'
import SearchResults from '../../containers/searchResults'
import OrgPage from '../../containers/organization'
import EditProfile from '../../containers/edit'
import Professional from '../../containers/professional'
import ProgramPage from '../../containers/program'
import GMap from '../../containers/map'
import NotFound from '../notFound'

const App = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <PrivateRoute exact path="/admin" component={Admin} />
      <Route exact path="/results" component={SearchResults} />
      <Route exact path="/organization/:id" component={OrgPage} />
      <Route exact path="/profile" component={Professional} />
      <Route exact path="/professional/:id" component={Professional} />
      <Route exact path="/program/:id" component={ProgramPage} />
      <Route exact path="/roadmap/:id" component={GMap} />
      <ProtectedRoute exact path="/profile/edit" component={EditProfile} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
