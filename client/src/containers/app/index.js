import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Demo from '../demo'


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchExample } from '../../actions'

class App extends Component {
  componentWillMount() {
    const { fetchExample } = this.props

    fetchExample()
  }

  render() {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/about-us">About</Link>
          <Link to="/demo">Demo</Link>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/demo" component={Demo} />
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
