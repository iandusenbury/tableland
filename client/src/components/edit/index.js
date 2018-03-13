import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import Person from 'material-ui/svg-icons/social/person'

import { Personal } from './Personal'
import { Media } from './Media'
import Experience from './Experience'
import { style } from '../../widgets/styles'
import './edit.css'

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
