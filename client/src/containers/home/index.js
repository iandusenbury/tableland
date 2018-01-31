import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Home = props => {
  const { changePage, message } = props

  return (
    <div>
      <h1>Home</h1>
      <p>{message}</p>
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
