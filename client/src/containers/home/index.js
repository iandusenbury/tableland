import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Button } from 'react-toolbox/lib/button/Button';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';

const Home = props => {
  const { changePage, message } = props

  return (
    <div>
	  <AppBar title='MESA' leftIcon='menu' rightIcon='inbox'>
	  	<Navigation type='horizontal'>
		</Navigation>
	  </AppBar>

	  <p>navbar should appear above</p>
      <h1>Home</h1>
      <p>{message}</p>

	  <Button label="Hello World!" />

      <button onClick={() => changePage()}>Go to about page via redux</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    message: state.app.example.message
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
