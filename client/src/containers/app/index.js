import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Home from '../home'
import About from '../about'
import Navbar from '../navbar'
import SearchResults from '../searchresults'

import { fetchExample } from '../../actions'

// TODO: remove this when merge in components
/* eslint-disable no-shadow */
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchExample
    },
    dispatch
  )

App.propTypes = {
  fetchExample: PropTypes.func.isRequired
}

export default withRouter(connect(null, mapDispatchToProps)(App))
