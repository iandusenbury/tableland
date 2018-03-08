import React, { Component } from 'react'
import Experience from './Experience'
import './edit.css'
import { Personal } from './Personal'
import { Media } from './Media'
import { style } from '../../widgets/styles'
import Avatar from 'material-ui/Avatar'
import Person from 'material-ui/svg-icons/social/person'

class EditProfile extends Component {
  render() {
    return (
      <div className="EditPrimaryDiv">
        <div className="EditHeader">
          <div className="EditHeaderAvatar">
            <Avatar icon={<Person />} size={100} style={style.avatarIcon} />
          </div>
        </div>
        <div className="EditMainGrid">
          <div className="EditPersonal">
            <Personal />
          </div>
          <div className="EditMedia">
            <Media />
          </div>
          <div className="EditExperience">
            <Experience />
          </div>
        </div>
      </div>
    )
  }
}

export default EditProfile
