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

import TopTab from '../../constants/tabs/tabViewMap'
import { orgPage } from '../../constants/viewStyles'
import './style.css'

const sampleImg = require('./sample.jpg')

class Program extends Component {
  componentWillMount() {
    const { fetchProgram, match } = this.props
    fetchProgram(match.params.id)
  }
  render() {
    const {
      name,
      description,
      url,
      media: { video },
      // sponsors,
      parentOrganizationNames,
      users
    } = this.props

    let videoUrl = ''
    let hasVideo = false
    if (video.url) {
      videoUrl = video.url.replace('watch?v=', 'embed/')
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
              <BusinessIcon style={orgPage.businessIcon} />
              <div>
                <p>{`Parent Organization(s): ${parentOrganizationNames}`}</p>
              </div>
            </div>
            <div className="organizationUrl">
              <div>
                <LanguageIcon style={orgPage.urlIcon} />
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
          {/*users.length > 0 && */(
            <div className="organizationEmployees">
              <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn style={orgPage.tableHeaderCol} />
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Position</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody showRowHover displayRowCheckbox={false}>
                  {createUserTable(users)}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    )
  }
}

Program.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired, // eslint-disable-line
  fetchProgram: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line
  media: PropTypes.object.isRequired, // eslint-disable-line
  sponsors: PropTypes.array.isRequired, // eslint-disable-line
  parentOrganizationNames: PropTypes.string.isRequired
}

function createUserTable(users) {
  return users.map(user => {
    const { id, firstName, lastName, mainTitle, media } = user

    return (
      <TableRow key={id} className="organizationTableRow" hoverable>
        <TableRowColumn style={orgPage.tableRowColAvatar}>
          <Avatar size={32} src={media.image.url} />
        </TableRowColumn>
        <TableRowColumn>
          {firstName} {lastName}
        </TableRowColumn>
        <TableRowColumn>[Position here]</TableRowColumn>
      </TableRow>
    )
  })
}

export default Program
