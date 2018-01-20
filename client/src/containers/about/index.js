import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const About = props => {
    const { changePage } = props

    return (
      <div>
        <h1>About Us</h1>
        <p>Hello Medium!</p>
        <button onClick={() => changePage()}>Go back to home!</button>
      </div>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(About)
