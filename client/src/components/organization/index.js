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
import PropTypes from 'prop-types'
import BusinessIcon from 'material-ui/svg-icons/communication/business'
import LanguageIcon from 'material-ui/svg-icons/action/language'
import { Link } from 'react-router-dom'

import OrgPage from './style'
import './style.css'

const sampleImg = require('../../assets/images/profileBackground.jpg')

class Organization extends Component {
  componentWillMount() {
    const { fetchOrganization, match } = this.props
    fetchOrganization(match.params.id)
  }
  render() {
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
      <div className="organizationMainDiv">
        <div className="organizationImage">
          <Card>
            <CardMedia overlay={<CardTitle id="org_name" title={name} />}>
              <img className="organizationImg" src={sampleImg} alt="" />
            </CardMedia>
          </Card>
        </div>
        <div className="organizationText">
          <div className="organizationName">
            <h3 className="organizationHeader3">{name}</h3>
            <Divider />
          </div>
          <div className="organizationContact">
            <div className="organizationAddress">
              <BusinessIcon style={OrgPage.businessIcon} />
              <div>
                <p>{addressLine1}</p>
                <p>
                  {city}, {state}
                </p>
                <p>
                  {country} {postalCode}
                </p>
                <p>{addressLine2}</p>
              </div>
            </div>
            <div className="organizationUrl">
              <div>
                <LanguageIcon style={OrgPage.urlIcon} />
              </div>
              <div>
                <p>{url}</p>
              </div>
            </div>
          </div>
          <div className="organizationDescription">
            <Divider />
            <p>{description}</p>
            {hasVideo && (
              <div className="organization-video-wrapper">
                <iframe
                  className="organizationVideo"
                  title="Organization Video"
                  allow="encrypted-media"
                  frameBorder="0"
                  src={videoUrl}
                />
              </div>
            )}
            <Divider />
          </div>
          {users.length > 0 && (
            <div className="organizationEmployees">
              <h2 style={{ textAlign: 'center' }}>Employees</h2>
              <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn style={OrgPage.tableHeaderCol} />
                    <TableHeaderColumn style={OrgPage.tableRowColName}>
                      Employee
                    </TableHeaderColumn>
                    <TableHeaderColumn>Job Title</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody showRowHover displayRowCheckbox={false}>
                  {createEmployeeTable(users)}
                </TableBody>
              </Table>
            </div>
          )}
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
  organizationVideo: PropTypes.string, // eslint-disable-line
  users: PropTypes.array.isRequired, // eslint-disable-line
  fetchOrganization: PropTypes.func.isRequired,
  match: PropTypes.bool.isRequired
}

function createEmployeeTable(employees) {
  return employees.map(employee => {
    const { id, firstName, lastName, mainTitle, imageUrl } = employee

    return (
      <TableRow key={id} className="organizationTableRow" hoverable>
        <TableRowColumn style={OrgPage.tableRowColAvatar}>
          <Link to={`/professional/${id}`}>
            <Avatar size={32} src={imageUrl} />
          </Link>
        </TableRowColumn>
        <TableRowColumn style={OrgPage.tableRowColName}>
          {firstName} {lastName}
        </TableRowColumn>
        <TableRowColumn>{mainTitle}</TableRowColumn>
      </TableRow>
    )
  })
}

export default Organization
