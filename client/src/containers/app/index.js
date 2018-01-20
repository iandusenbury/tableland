import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Contact from '../contact'
import GoogleMap from '../map'
import '../../style.css'

const App = () => (
  <div>
    <header>
      <div className='navbar'>
        <Link to="/">Home</Link>
        <Link to="/about-us">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/map">GoogleMap</Link>
      </div>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/map" component={GoogleMap} />
    </main>
  </div>
)

export default App
