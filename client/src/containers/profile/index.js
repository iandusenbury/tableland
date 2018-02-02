import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Divider, 
          Avatar,
          RaisedButton 
        } from 'material-ui'
import { push } from 'react-router-redux'

import './style.css'

const Profile = props => {
	const {
		user: {
			firstName,
			lastName,
			experience,
      linkedIn,
      email
		}, changePage
	} = props

  return (
		<div>
			<h1 className='title'>{firstName} {lastName}</h1>
      <div className='title'><Avatar size={60} src="./blank-portrait.png" /></div>
      <div className='experience'>{experience[0][0]} at {experience[0][1]} from {experience[0][2]} to {experience[0][3]}</div>
      <br />
      <div className='contact'>linkedIn: {linkedIn}</div>
      <div className='contact'>email: {email}</div> 
      <br /><Divider /><br />
      <div className='experience'>{experience[1][0]} at {experience[1][1]} from {experience[1][2]} to {experience[1][3]}</div>
      <div className='experience'>{experience[2][0]} at {experience[2][1]} from {experience[2][2]} to {experience[2][3]}</div>
      <div className='bottom-outer'>
        <div className='bottom-inner'>
          <RaisedButton label='Map View' onClick={() => changePage()}/>
        </div>
      </div>
    </div>
	)
}

const mapStateToProps = state => {
  return {
    user: state.app.profile.user
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/')
}, dispatch)

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(Profile)
