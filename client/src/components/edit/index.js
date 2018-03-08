import React, { Component } from 'react'
import Experience from './Experience'
import './edit.css'
import Personal from './Personal'
import Media from './Media'
import { style } from '../../widgets/styles'
import Avatar from 'material-ui/Avatar'
import Person from 'material-ui/svg-icons/social/person'
import {RaisedButton} from "material-ui";

export async function showResults(values) {
    console.log(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
}

class EditProfile extends Component {
  componentDidMount() {
    const { fetchProfessional } = this.props
    fetchProfessional(3)
  }

  render() {
    const {
      firstName,
      lastName,
      description,
      mainTitle,
      profileImage,
      profileVideo,
      experiences,
      submit
    } = this.props

    const exists = firstName !== ''
    return (
      <div>
          {exists &&
          <div className="EditPrimaryDiv">
              <div className="EditHeader">
                  <div className="EditHeaderAvatar">
                      <Avatar src={profileImage} size={100} style={style.avatarIcon}/>
                  </div>
              </div>
              <div className="EditMainGrid">
                  <div className="EditPersonal">
                      <Personal
                          first={firstName}
                          last={lastName}
                          about={description}
                          title={mainTitle}
                          onSubmit={showResults}
                      />
                  </div>
                  <div className="EditMedia">
                      <Media video={profileVideo}/>
                  </div>
                  <div className="EditExperience">
                      <Experience experiences={experiences}/>
                  </div>
              </div>
              <RaisedButton label="save" onClick={() => submit('personal')} fullWidth={true} secondary={true}/>
          </div>
          }
      </div>
    )
  }
}

export default EditProfile
