import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import searchresults from '../searchresults'

const App = () => (
  <div>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/results">Search Results</Link>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/results" component={searchresults} />
    </main>
  </div>
)

export default App
