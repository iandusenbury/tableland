import  React, { Component } from 'react'
import {
  Card,
  CardMedia,
  Divider,
  Paper,
  List,
  ListItem,
  Avatar
} from 'material-ui'
import LanguageIcon from 'material-ui/svg-icons/action/language'
import TopTab from '../../constants/tabs/tabViewMap'
import { orgPage } from '../../constants/viewStyles'
import './style.css'
import Group from 'material-ui/svg-icons/social/group'
import Domain from 'material-ui/svg-icons/social/domain'

const hasVideo = true // this will be passed as props
const portraitImg = require('./portrait.png')
const sampleImg = require('./sample.jpg')

class professional extends Component {
  componentWillMount() {
    this.props.fetchProfessional(3)
  }

  render () {
    const {
      /* fields not yet used
      id,
      type,
      role,
      link,
      */
      firstName,
      lastName,
      description,
      contactUrl,
      mainTitle,
      mainLocation,
      media,
      experiences
    } = this.props.user

    const findAvatar = media.find(element => {
      if (element.category === 'image') 
        return element.url
      return portraitImg
    })

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
                    src={findAvatar}
                  />
                  <Paper className="professionalPaperStyle" zDepth={5}>
                    <h1 className="professionalHeader1">
                      {mainTitle} at {mainLocation}
                    </h1>
                  </Paper>
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
                <LanguageIcon style={orgPage.urlIcon} />
              </div>
              <div>
                <p>
                  {contactUrl}
                </p>
              </div>
            </div>
          </div>
          <div className="professionalDescription">
            <Divider />
            <p>
              {description}
            </p>
            {hasVideo && (
              <div>
                <video /> {/* placeholder, has linting error here */}
              </div>
            )}
            <Divider />
          </div>
          <div className="professionalExperiences">
            <List>
              {createExperienceTable(experiences)}
            </List>
          </div>
        </div>
      </div>
    )
  }
}

function createExperienceTable(experiences) {
  return experiences.map( experience => {
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
    if (organization === undefined)
      return createProgramTable(name, experience)

    return (
      <ListItem key={id} leftIcon={<Domain />}>
        <h4>{name} - {title}</h4>
        <p>{startDate} - {endDate}</p>
        <p>{award}</p>
      </ListItem>
    )
  })
}

function createProgramTable(name, experience) {
  const {
    id,
    startDate,
    endDate,
    title,
    award,
    program
  } = experience

  return (
      <ListItem key={id} leftIcon={<Group />}>
        <h4>{name} - {title}</h4>
        <p>{startDate} - {endDate}</p>
        <p>{award}</p>
      </ListItem>
  )
}

export default professional
