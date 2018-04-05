import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardMedia, Divider, List, ListItem, Avatar } from 'material-ui'
import LanguageIcon from 'material-ui/svg-icons/action/language'
import Group from 'material-ui/svg-icons/social/group'
import Domain from 'material-ui/svg-icons/social/domain'
import PropTypes from 'prop-types'

import TopTab from '../../widgets/tabs/tabViewMap'
import ProfPage from './style'
import { getDate } from '../../constants/dates'
import './style.css'

const sampleImg = require('./sample.jpg')

class Professional extends Component {
  componentWillMount() {
    const { fetchProfessional, match } = this.props
    fetchProfessional(match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    const {
      fetchProfessional,
      location: { pathname: nextPathName }
    } = nextProps
    const { location: { pathname } } = this.props

    if (nextPathName !== pathname) {
      fetchProfessional()
    }
  }

  render() {
    const {
      id,
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
        <Link to={`/roadmap/${id}`} className="professionalTopTab">
          <TopTab />
        </Link>
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
                    {mainTitle && (
                      <h1 className="professionalHeader1">
                        {mainTitle} at {mainLocation}
                      </h1>
                    )}
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
              <div className="professional-url-icon">
                <LanguageIcon />
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
  id: PropTypes.number.isRequired,
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
  // create organization list
  // organize by end date
  // create program list
  // organize by reverse end date
  // insert programs into organization list following their parent org
  // print experiences
  var orgList = [], progList = []
  for (var i in experiences) {
    if (experiences[i].hasOwnProperty('organization'))
      orgList.push(experiences[i])
    else
      progList.push(experiences[i])
  }
  orgList.sort(function(a,b) {
    if (!a.endDate)
      return -1
    if (!b.endDate)
      return 1
    return new Date(b.endDate) - new Date(a.endDate)
  })

  progList.sort(function(a,b) {
    return new Date(b.endDate) - new Date(a.endDate)
  })

  var expList = []
  for (var j in orgList) {
    expList.push(orgList[j])
    for (var k in progList) {
      if (orgList[j].organization.id === progList[k].parentOrganization)
        expList.push(progList[k])
    }
  }

  /*
  // Sort experiences by order of end date,
  // putting current positions first.
  experiences.sort(function(a,b) {
    if (!a.endDate)
      return -1
    if (!b.endDate)
      return -1
    return new Date(b.endDate) - new Date(a.endDate)
  })
  */

  return expList.map(experience => {
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
      <ListItem
        key={id}
        leftIcon={<Domain />}
        containerElement={<Link to={`/organization/${organization.id}`} />}>
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
  const { id, startDate, endDate, title, award, program } = experience

  const start = getDate(startDate)
  const end = getDate(endDate)

  return (
    <ListItem
      key={id}
      leftIcon={<Group />}
      containerElement={<Link to={`/program/${program.id}`} />}>
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

export default Professional
