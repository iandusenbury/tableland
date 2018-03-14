import React, { Component } from 'react'
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
    /*submit('personal');
    submit('existingExperiences')
    submit('media')*/

    submit('newExperiences'); //post
}

class EditProfile extends Component {

  render() {
    const {
      profileImage,
      submit,
      createThings,
      userId,
      loading
    } = this.props


      const submitHandler = values => {
          if(!values.newExp) return

          values.newExp.forEach(exp => {
              const {name, position, current,
                  award, startDate, endDate,
                    address, city, state, postal, country, programs} = exp

              const organization = {
                  name,
                  addressLine_1: address,
                  addressLine_2: '123',
                  city,
                  state,
                  postalCode: postal,
                  country,
                  lat: 1.7,
                  lng: 2.5
              }


              const experience = {
                  title: position,
                  award,
                  startDate,
                  endDate,
                  current
              }

              const allPrograms = []

              programs.forEach(program => {
                  const prog = { name: program.name }
                  allPrograms.push(prog)
              })

              createThings(organization, experience, allPrograms, userId)
          })
      }

    return (
      <div>
          {!loading &&
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
                      <Experiences submitHandler={submitHandler}/>
                  </div>
              </div>
              <div style={{ margin:".5%"}}>
              <RaisedButton label="Save" onClick={() => clickFunction(submit)}
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
