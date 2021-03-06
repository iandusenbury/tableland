import React from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../containers/privateRoute'
import ProtectedRoute from '../../containers/protectedRoute'
import Navbar from '../../containers/navbar'

// routes
import Admin from '../../containers/admin'
import Home from '../home'
import About from '../about'
import OrgPage from '../../containers/organization'
import SearchResults from '../../containers/searchResults'
import EditProfile from '../../containers/edit'
import Professional from '../../containers/professional'
import ProgramPage from '../../containers/program'
import GMap from '../../containers/map'
import NotFound from '../notFound'
import EditOrg from '../../containers/editOrganization'
import EditProg from '../../containers/editProgram'

const App = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <PrivateRoute exact path="/admin" component={Admin} />
      <PrivateRoute exact path="/organization/edit/:id" component={EditOrg} />
      <PrivateRoute exact path="/program/edit/:id" component={EditProg}/>
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
