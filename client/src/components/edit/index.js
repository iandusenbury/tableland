import React, { Component } from 'react'
import { Experience } from './Experience'
import './edit.css'
import { Personal } from './Personal'
import { Media } from './Media'
import { style } from '../../widgets/styles'
import Avatar from 'material-ui/Avatar'
import Person from 'material-ui/svg-icons/social/person'
import {fetchProfessional} from "../../actions";

class EditProfile extends Component {

  componentWillMount(){
      const objectReturned = fetchProfessional(3);
      console.log(objectReturned);
  }

  render() {

    const {
        firstName,
        lastName,
        description,
        contactUrl,
        mainTitle,
        mainLocation,
        profileImage,
        profileVideo,
        experiences
    } = this.props

    return (
      <div className="EditPrimaryDiv">
        <div className="EditHeader">
          <div className="EditHeaderAvatar">
            <Avatar icon={<Person />} size={100} style={style.avatarIcon} />
          </div>
        </div>
        <div className="EditMainGrid">
          <div className="EditPersonal">
            <Personal firstName={firstName} lastName={lastName} description={description} title={mainTitle}/>
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
