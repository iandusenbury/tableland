import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateFirstNameTo } from '../../actions'

const Demo = props => {
  const {
    user: {
      firstName,
      lastName,
      age,
      salary
    },
    updateFirstNameTo
  } = props

  return (
    <div>
      <h1>This is the redux demo</h1>
      <div>first name: {firstName}</div>
      <div>last name: {lastName}</div>
      <div>age: {age}</div>
      <div>salary: {salary}</div>
      <button onClick={() => updateFirstNameTo('Jeffery')}>Change first name to 'Jeffery'</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.app.demo.user
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateFirstNameTo
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Demo)
