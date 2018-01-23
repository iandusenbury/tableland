import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import searchresults from '../searchresults'
import { Nav, NavItem, Navbar } from 'react-bootstrap'

const App = () => (
  <div>
    <Navbar>
      <Nav bsStyle='tabs'>
    {/*
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/results">Search Results</Link>
    */}
        <NavItem href='/'>
          Home
        </NavItem>
        <NavItem href='about-us'>
          About
        </NavItem>
        <NavItem href='/results'>
          Search Results
        </NavItem>
      </Nav>
    </Navbar>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/results" component={searchresults} />
    </main>
  </div>
)

export default App
