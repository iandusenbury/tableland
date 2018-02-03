import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from '../../containers/home'
import About from '../about'
import Navbar from '../navbar'
import SearchResults from '../searchresults'

class App extends Component {
  componentWillMount() {
    const { fetchExample } = this.props

    fetchExample()
  }

  render() {
    return (
      <div>
        <Navbar />
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/results" component={SearchResults} />
        </main>
      </div>
    )
  }
}

export default App
