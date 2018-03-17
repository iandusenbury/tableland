import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import { RaisedButton } from 'material-ui'

import Personal from '../../containers/personal'
import Media from '../../containers/media'
import { style } from '../../widgets/styles'
import Experiences from './Experiences'

import './edit.css'

// function for the update of existing information
export async function showResults(values) {
  console.log(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
}

// function for the post of new experiences
export async function printResults(values) {
  console.log(`halala submitted:\n\n${JSON.stringify(values, null, 2)}`)
}

function clickFunction(submit) {
  submit('newExperiences') // post
  submit('personal')
  submit('existingExperiences')
  submit('media')
}

class EditProfile extends Component {
  render() {
    const {
      profileImage,
      submit,
      createThings,
      updateUserInfo,
      updateUserExperience,
      changeUserVideo,
      hasVideo,
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
          city,
          state,
          postal,
          country,
          programs
        } = exp

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

        const allPrograms = programs.map(program => {
          const { name: progName } = program

          return { name: progName }
        })

        createThings(organization, experience, allPrograms, userId)
      })
    }

    const savePersonalInfo = values => {
      const { firstName, lastName, description, mainTitle } = values
      const info = {
        firstName,
        lastName,
        description,
        mainTitle
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
      changeUserVideo(profileVideo, userId, videoId, hasVideo)
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
