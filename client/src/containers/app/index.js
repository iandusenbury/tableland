import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'


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
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
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
