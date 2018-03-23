import React from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../containers/privateRoute'
import Navbar from '../../containers/navbar'

// routes
import Admin from '../../containers/admin'
import Home from '../home'
import About from '../about'
import SearchResults from '../../containers/searchResults'
import OrgPage from '../../containers/organization'
import EditProfile from '../edit'
import Professional from '../../containers/professional'
import ProgramPage from '../../containers/program'
import GMap from '../../containers/map'
import NotFound from '../notFound'
import EditOrg from '../../containers/editOrganization'

const App = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <PrivateRoute exact path="/admin" component={Admin} />
      <PrivateRoute exact path="/organization/edit/:id" component={EditOrg}/>
      <Route exact path="/results" component={SearchResults} />
      <Route exact path="/organization/:id" component={OrgPage} />
      <Route exact path="/profile" component={Professional} />
      <Route exact path="/professional/:id" component={Professional} />
      <Route exact path="/program/:id" component={ProgramPage} />
      <Route exact path="/roadmap/:id" component={GMap} />
      <Route exact path="/edit" component={EditProfile} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
