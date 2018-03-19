import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import { RaisedButton } from 'material-ui'

import Personal from '../../containers/personal'
import Media from '../../containers/media'
import { style } from '../../widgets/styles'
import Experiences from './Experiences'

import './edit.css'

function clickFunction(submit) {
  submit('personal')
  submit('media')
  submit('existingExperiences')
  submit('newExperiences') // post
}

class EditProfile extends Component {
  render() {
    const {
      profileImage,
      submit,
      createThings,
      updateUserInfo,
      updateUserExperience,
      updateUserVideo,
      videoId,
      userId,
      loading
    } = this.props

    const submitHandler = values => {
      if (!values.newExp) return


      values.newExp.forEach(exp => {

        const {
          name,
          position,
          current,
          award,
          startDate,
          endDate,
          address,
          programs
        } = exp

        let addressLine_1, addressLine_2, city, state, postalCode, country;

        if(!address) return

        address.results.addressComponents.forEach(item => {
          item.types.forEach(type => {
            if(type === "postal_code"){
              postalCode = item.longName
            }
            if(type === "country"){
              country = item.longName
            }
            if(type === 'locality'){
              city = item.longName
            }
            if(type === 'administrative_area_level_1'){
                  state = item.longName
            }
            if(type === 'floor'){
              addressLine_1 += item.longName
            }
            if(type === "administrative_area_level_2"){
                addressLine_2 = item.longName
            }
          })

        });


        const organization = {
          name,
          addressLine_1: address.results.formattedAddress,
          addressLine_2,
          city,
          state,
          postalCode,
          country,
          lat: address.results.geometry.location.lat(),
          lng: address.results.geometry.location.lng()
        }

        const experience = {
          title: position,
          award,
          startDate: startDate.toString(),
          endDate: endDate.toString(),
          current
        }


        let allPrograms = []

          if(programs) {
              programs.forEach(program => {
                  if(program === {}) return

                  const prog = {name: program.name}
                  allPrograms.push(prog)
              })
          }

          createThings(organization, experience, allPrograms, userId)
      })
    }

    const savePersonalInfo = values => {
      const { firstName, lastName, description } = values
      const info = {
        firstName,
        lastName,
        description
      }

      updateUserInfo(info, userId)
    }

    const saveUpdatedExperiences = values => {
      if (!values) return

      values.existingExp.forEach(exp => {
        const {
          position,
          award,
          startDate,
          endDate,
          programs,
          current,
          expId
        } = exp

        const experience = {
          startDate: startDate.toString(),
          endDate: endDate.toString(),
          title: position,
          award,
          current
        }

        updateUserExperience(experience, userId, expId)

        if (programs) {
          programs.forEach(prog => {
            const { startDate, endDate, position, expId, award, current } = prog

            const program = {
              startDate: startDate.toString(),
              endDate: endDate.toString(),
              title: position,
              award,
              current
            }

            updateUserExperience(program, userId, expId)
          })
        }
      })
    }

    const saveUpdatedVideoLink = value => {
      const { profileVideo } = value
      updateUserVideo(profileVideo, userId, videoId)
    }

    return (
      <div>
        {!loading && (
          <div className="EditPrimaryDiv">
            <div className="EditHeader">
              <div className="EditHeaderAvatar">
                <Avatar
                  src={profileImage}
                  size={100}
                  style={style.avatarIcon}
                />
              </div>
            </div>
            <div className="EditMainGrid">
              <div className="EditPersonal">
                <Personal onSubmit={savePersonalInfo} />
              </div>
              <div className="EditMedia">
                <Media onSubmit={saveUpdatedVideoLink} />
              </div>
              <div className="EditExperience">
                <Experiences
                  submitHandler={submitHandler}
                  saveUpdatedExperiences={saveUpdatedExperiences}
                />
              </div>
            </div>
            <div style={{ margin: '.5%' }}>
              <RaisedButton
                label="Save"
                onClick={() => clickFunction(submit)}
                fullWidth
                primary
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

EditProfile.propTypes = {
  profileImage: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  createThings: PropTypes.func.isRequired,
  updateUserInfo: PropTypes.func.isRequired,
  updateUserExperience: PropTypes.func.isRequired,
  changeUserVideo: PropTypes.func.isRequired,
  hasVideo: PropTypes.bool.isRequired,
  videoId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
}

export default EditProfile
