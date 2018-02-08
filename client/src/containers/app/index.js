/*  created linting errors
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from '../../components/home'
import About from '../../components/about'
import Navbar from '../../components/navbar'


import { bindActionCreators } from 'redux'
*/
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import App from '../../components/app'

export default withRouter(connect()(App))
