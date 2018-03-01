import  React, { Component } from 'react'
import {
  Card,
  CardMedia,
  Divider,
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

//const hasVideo = true // this will be passed as props
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
      profileImage,
      profileVideo,
      experiences
    } = this.props

    var videoUrl = ''
    var hasVideo = false
    if (profileVideo) {
      videoUrl = profileVideo.replace('watch?v=', 'embed/')
      hasVideo = true
    }

    return (
      <div className='professionalMainDiv'>
        <TopTab className='professionalTopTab' />
        <div className='professionalImage'>
          <Card>
            <CardMedia
              overlay={
                <div className='professionalAvatarDiv'>
                  <Avatar
                    className='professionalAvatarStyle'
                    size={200}
                    src={profileImage}
                  />
                  <div className='professionalPaperStyle' >
                    <h1 className='professionalHeader1'>
                      {mainTitle} at {mainLocation}
                    </h1>
                  </div>
                </div>
              }>
              <img className='professionalImg' src={sampleImg} alt='' />
            </CardMedia>
          </Card>
        </div>
        <div className='professionalText'>
          <div className='professionalName'>
            <h3 className='professionalHeader3'>
              {firstName} {lastName}
            </h3>
            <Divider />
          </div>
          <div className='professionalContact'>
            <div className='professionalUrl'>
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
          <div className='professionalDescription'>
            <Divider />
            <p>
              {description}
            </p>
            {hasVideo && (
              <iframe 
                className='professionalVideo' 
                title='Professional Video' 
                allow= 'encrypted-media'
                frameborder='0'
                src={videoUrl}
              />
            )}
            <Divider />
          </div>
          <div className='professionalExperiences'>
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

    var start = getDate(startDate)
    var end = getDate(endDate)

    return (
      <ListItem key={id} leftIcon={<Domain />}>
        <h4>{name} - {title}</h4>
          <p>{start} - {end}</p>
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
  } = experience
  
 var start = getDate(startDate)
 var end = getDate(endDate)

  return (
      <ListItem key={id} leftIcon={<Group />}>
        <h4>{name} - {title}</h4>
        <p>{start} - {end}</p>
        <p>{award}</p>
      </ListItem>
  )
}

// This const defines months for use in following function
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// This function takes a date string as an argument and returns a string in the format
// [mon] [year]
function getDate(date) {
  if (date !== null) {
     var date = new Date(date.toString())
     date = monthNames[date.getMonth()] + ' ' + date.getFullYear()
  }
  else
    date = 'Current'

  return date
}

export default professional
