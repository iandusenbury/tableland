import React from 'react'
import { Route } from 'react-router-dom'
import Admin from '../../containers/admin'
import About from '../about'
import Home from '../home'
import Navbar from '../../containers/navbar'
import SearchResults from '../searchResults'

const App = () => (
  <div>
    <Navbar />
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/results" component={SearchResults} />
      <Route exact path="/admin" component={Admin} />
    </main>
  </div>
)

export default App
