import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Navbar from '../navbar'
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
		<Navbar />

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/navbar" component={Navbar} />
          <Route exact path="/demo" component={Demo} />
        </main>

      </div>
    )
  }
}

/*

        <header>
          <Link to="/">Home</Link>
          <Link to="/about-us">About</Link>
		  <Link to="/navbar">Navbar</Link>
		  <Link to="/demo">Demo</Link>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/navbar" component={Navbar} />
          <Route exact path="/demo" component={Demo} />
        </main>

*/

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchExample
}, dispatch)

export default withRouter(connect(
  null,
  mapDispatchToProps
)(App))
