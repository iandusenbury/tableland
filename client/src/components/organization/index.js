import React, { Component } from 'react'
import {
  Card,
  CardMedia,
  CardTitle,
  Divider,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableBody,
  Avatar
} from 'material-ui'
import BusinessIcon from 'material-ui/svg-icons/communication/business'
import LanguageIcon from 'material-ui/svg-icons/action/language'
import PropTypes from 'prop-types'

import TopTab from '../../constants/tabs/tabViewMap'
import { orgPage } from '../../constants/viewStyles'
import './style.css'

const portraitImg = require('./portrait.png')
const sampleImg = require('./sample.jpg')

class Organization extends Component {
  componentWillMount() {
    const { fetchOrganization } = this.props
    fetchOrganization(13)
  }
  
  render () {
    const {
      name,
      description,
      url,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      organizationVideo,
      users
    } = this.props

    let videoUrl = ''
    let hasVideo = false
    if (organizationVideo) {
      videoUrl = organizationVideo.replace('watch?v=', 'embed/')
      hasVideo = true
    }

    return (
      <div className='organizationMainDiv'>
        <TopTab className='organizationTopTab' />
        <div className='organizationImage'>
          <Card>
            <CardMedia
              overlay={<CardTitle id='org_name' title={name} />}>
              <img className='organizationImg' src={sampleImg} alt='' />
            </CardMedia>
          </Card>
        </div>
        <div className='organizationText'>
          <div className='organizationName'>
            <h3 className='organizationHeader3'>{name}</h3>
            <Divider />
          </div>
          <div className='organizationContact'>
            <div className='organizationAddress'>
              <BusinessIcon style={orgPage.businessIcon} />
              <div>
                <p>{addressLine1}</p>
                <p>{city}, {state}</p>
                <p>{country} {postalCode}</p>
                <p>{addressLine2}</p>
              </div>
            </div>
            <div className='organizationUrl'>
              <div>
                <LanguageIcon style={orgPage.urlIcon} />
              </div>
              <div>
                <p>{url}</p>
              </div>
            </div>
          </div>
          <div className='organizationDescription'>
            <Divider />
            <p>{description}</p>
            {hasVideo && (
              <div className="organization-video-wrapper">
                <iframe
                  className='organizationVideo'
                  title='Organization Video'
                  allow='encrypted-media'
                  frameBorder='0'
                  src={videoUrl}
                />
              </div>
            )}
            <Divider />
          </div>
          <div className='organizationEmployees'>
            <Table>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn style={orgPage.tableHeaderCol} />
                  <TableHeaderColumn>Employee</TableHeaderColumn>
                  <TableHeaderColumn>Job Title</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody showRowHover displayRowCheckbox={false}>
                {createEmployeeTable(users)}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}

Organization.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  addressLine1: PropTypes.string.isRequired,
  addressLine2: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  organizationVideo: PropTypes.string,
  users: PropTypes.array.isRequired
}

function createEmployeeTable(employees) {
  return employees.map(employee => {
    const {
      id,
      firstName,
      lastName,
      mainTitle,
      media
    } = employee

    var imageUrl = media.reduce((obj, item) => {
      obj[item.category] = item
      return obj
    }, {})

    if (imageUrl.image)
      imageUrl = imageUrl.image.url
    else
      imageUrl = null
 
    return (
      <TableRow key={id} className='organizationTableRow' hoverable>
        <TableRowColumn style={orgPage.tableRowColAvatar}>
          <Avatar size={32} src={imageUrl || portraitImg} />
        </TableRowColumn>
        <TableRowColumn>{firstName} {lastName}</TableRowColumn>
        <TableRowColumn>{mainTitle}</TableRowColumn>
      </TableRow>
    )
  })
}

export default Organization
