import React, { Component } from 'react'
import {
  Paper,
  FlatButton,
  Avatar
} from 'material-ui'
import Person from 'material-ui/svg-icons/social/person'
import { Link } from 'react-router-dom'
import './main.css'

export default class ProfileView extends Component {
  render() {
    return(
      <div className='mainWrapper'>
        <Avatar icon={<Person/>} size={120}/>
        <div>
          <p>Fred Henderson</p>
          <p>fhenderson@gmail.com  (123)456-7890</p>
          <p></p>
          <p>Volunteer Coordinator at Food Bank of America</p> 
          <p>Bachelor of Science in Communication from University of Western Washington</p>
          <p>linkedIn: fhenderson</p>
        <Paper zDepth={0}>
          <FlatButton containerElement={<Link to="/"/>} label="Roadmap" />
        </Paper>
        </div>
      </div>
    )
  }
}

