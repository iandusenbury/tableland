import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Contact = props => {
  const { changePage } = props
  let list = Array.from(Array(100).keys());

  return (
    <div className='contact-div'>
      <h1>Contacts</h1>
      <ul className='contact-list'>
        {list.map(i => {
          return <li key={i.toString()}>{i}</li>; // key needed since list is a mix of strings and numbers
        })}
      </ul>
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
)(Contact)
