import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Navbar from '../navbar'
import SearchResults from '../searchresults'
import DummyUsers from '../dummyUsers'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchExample } from '../../actions'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/results" component={SearchResults} />
          <Route exact path="/dummy-users" component={DummyUsers} />
        </main>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchExample
}, dispatch)

export default withRouter(connect(
  null,
  mapDispatchToProps
)(App))
