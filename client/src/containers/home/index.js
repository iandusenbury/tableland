import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Map from '../map'

const Home = props => {
  const { changePage, message } = props

  return (
    <div>
      <Map />
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
