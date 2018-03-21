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
      <div className="editPrimaryDiv">
        <div className="editHeader">
          <div className="editHeaderAvatar">
            <Avatar icon={<Person />} size={100} style={style.avatarIcon} />
          </div>
        </div>
        <div className="editMainGrid">
          <div className="editPersonal">
            <Personal />
          </div>
          <div className="editMedia">
            <Media />
          </div>
          <div className="editExperience">
            <Experience />
          </div>
        </div>
      </div>
    )
  }
}

export default EditProfile
