import React, { Component } from 'react'
import Experience from './Experience'
import './edit.css'
import Personal from '../../containers/personal'
import Media from '../../containers/media'
import { style } from '../../widgets/styles'
import Avatar from 'material-ui/Avatar'
import {RaisedButton} from "material-ui";
import Experiences from './Experiences'



//function for the update of existing information
export async function showResults(values) {
    console.log(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
}

//function for the post of new experiences
export async function printResults(values) {
    console.log(`halala submitted:\n\n${JSON.stringify(values, null, 2)}`);
}

function clickFunction(submit){
  //update
    submit('personal');
    submit('existingExperiences')
    submit('media')

    submit('newExperiences'); //post
}

class EditProfile extends Component {
  componentDidMount() {
    const { fetchProfessional } = this.props
    fetchProfessional(3)
  }

  render() {
    const {
      firstName,
      profileImage,
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
                          onSubmit={showResults}
                      />
                  </div>
                  <div className="EditMedia">
                      <Media onSubmit={showResults}/>
                  </div>
                  <div className="EditExperience">
                      <Experiences />
                  </div>
              </div>
              <div style={{ margin:".5%"}}>
              <RaisedButton label="Update" onClick={() => clickFunction(submit)}
                             fullWidth={true} primary={true}
                            />
              </div>
          </div>
          }
      </div>
    )
  }
}

export default EditProfile
