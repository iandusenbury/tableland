import React, { Component } from 'react'
import { Card, CardMedia, Divider, List, ListItem, Avatar } from 'material-ui'
import LanguageIcon from 'material-ui/svg-icons/action/language'
import Group from 'material-ui/svg-icons/social/group'
import Domain from 'material-ui/svg-icons/social/domain'
import PropTypes from 'prop-types'

import TopTab from '../../widgets/tabs/tabViewMap'
import ProfPage from './style'
import './style.css'

// const hasVideo = true // this will be passed as props
const sampleImg = require('./sample.jpg')

class Professional extends Component {
  componentWillMount() {
    const { fetchProfessional, match } = this.props
    fetchProfessional(match.params.id)
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

    let videoUrl = ''
    let hasVideo = false
    if (profileVideo) {
      videoUrl = profileVideo.replace('watch?v=', 'embed/')
      hasVideo = true
    }

    return (
      <div className="professionalMainDiv">
        <TopTab className="professionalTopTab" />
        <div className="professionalImage">
          <Card>
            <CardMedia
              overlay={
                <div className="professionalAvatarDiv">
                  <Avatar
                    className="professionalAvatarStyle"
                    size={200}
                    src={profileImage}
                  />
                  <div className="professionalPaperStyle">
                    <h1 className="professionalHeader1">
                      {mainTitle} at {mainLocation}
                    </h1>
                  </div>
                </div>
              }>
              <img className="professionalImg" src={sampleImg} alt="" />
            </CardMedia>
          </Card>
        </div>
        <div className="professionalText">
          <div className="professionalName">
            <h3 className="professionalHeader3">
              {firstName} {lastName}
            </h3>
            <Divider />
          </div>
          <div className="professionalContact">
            <div className="professionalUrl">
              <div>
                <LanguageIcon style={ProfPage.urlIcon} />
              </div>
              <div>
                <p>{contactUrl}</p>
              </div>
            </div>
          </div>
          <div className="professionalDescription">
            <Divider />
            <p>{description}</p>
            {hasVideo && (
              <div className="professionalVideoWrapper">
                <iframe
                  className="professionalVideo"
                  title="Professional Video"
                  allow="encrypted-media"
                  frameBorder="0"
                  src={videoUrl}
                />
              </div>
            )}
            <Divider />
          </div>
          <div className="professionalExperiences">
            <List>{createExperienceTable(experiences)}</List>
          </div>
        </div>
      </div>
    )
  }
}

Professional.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  contactUrl: PropTypes.string.isRequired,
  mainTitle: PropTypes.string.isRequired,
  mainLocation: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  profileVideo: PropTypes.string.isRequired,
  experiences: PropTypes.element.isRequired,
  fetchProfessional: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired // eslint-disable-line
}

function createExperienceTable(experiences) {
  return experiences.map(experience => {
    const {
      id,
      startDate,
      endDate,
      title,
      award,
      organization,
      program
    } = experience

    const name = organization ? organization.name : program.name
    if (organization === undefined) return createProgramTable(name, experience)

    const start = getDate(startDate)
    const end = getDate(endDate)

    return (
      <ListItem key={id} leftIcon={<Domain />}>
        <h4>
          {name} - {title}
        </h4>
        <p>
          {start} - {end}
        </p>
        <p>{award}</p>
      </ListItem>
    )
  })
}

function createProgramTable(name, experience) {
  const { id, startDate, endDate, title, award } = experience

  const start = getDate(startDate)
  const end = getDate(endDate)

  return (
    <ListItem key={id} leftIcon={<Group />}>
      <h4>
        {name} - {title}
      </h4>
      <p>
        {start} - {end}
      </p>
      <p>{award}</p>
    </ListItem>
  )
}

// This const defines months for use in following function
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
// This function takes a date string as an argument and returns a string in the format
// [mon] [year]
function getDate(date) {
  if (date === null) return 'current'

  const initDate = new Date(date.toString())
  return `${monthNames[initDate.getMonth()]} ${initDate.getFullYear()}`
}

export default Professional
