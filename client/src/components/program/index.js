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

import ProgPage from './style'
import './style.css'

const sampleImg = require('../../assets/images/profileBackground.jpg')

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
      sponsors,
      users,
      navigateToProfessional
    } = this.props

    let videoUrl = ''
    let hasVideo = false
    if (video.url) {
      videoUrl = video.url.replace('watch?v=', 'embed/')
      hasVideo = true
    }

    const parentOrgDisplay =
      sponsors.length > 1 ? 'Parent Organizations' : 'Parent Organization'

    return (
      <div className="programMainDiv">
        <div className="programImage">
          <Card>
            <CardMedia overlay={<CardTitle id="org_name" title={name} />}>
              <img className="programImg" src={sampleImg} alt="" />
            </CardMedia>
          </Card>
        </div>
        <div className="programText">
          <div className="programName">
            <h3 className="programHeader3">{name}</h3>
            <Divider />
          </div>
          <div className="programContact">
            <div className="programAddress">
              <BusinessIcon style={ProgPage.businessIcon} />
              <div>
                <p>
                  {`${parentOrgDisplay}: `}
                  {sponsors.map((sponsor, index) => {
                    const { id, name: orgName } = sponsor
                    if (index > 0)
                      return (
                        <Link to={`/organization/${id}`}>{`, ${orgName}`}</Link>
                      )
                    return (
                      <Link to={`/organization/${id}`}>{`${orgName}`}</Link>
                    )
                  })}
                </p>
              </div>
            </div>
            <div className="programUrl">
              <div>
                <LanguageIcon style={ProgPage.urlIcon} />
              </div>
              <div>
                <p>{url}</p>
              </div>
            </div>
          </div>
          <div className="programDescription">
            <Divider />
            <p>{description}</p>
            {hasVideo && (
              <div className="program-video-wrapper">
                <iframe
                  className="programVideo"
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
            <div className="programEmployees">
              <h2 style={{ textAlign: 'center' }}>Members</h2>
              <Table onRowSelection={id => navigateToProfessional(id, users)}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn style={ProgPage.tableHeaderCol} />
                    <TableHeaderColumn style={ProgPage.tableRowColName}>
                      Name
                    </TableHeaderColumn>
                    <TableHeaderColumn style={ProgPage.tableRowColName}>
                      Current Position
                    </TableHeaderColumn>
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
  navigateToProfessional: PropTypes.func.isRequired // eslint-disable-line
}

function createUserTable(users) {
  return users.map(user => {
    const { id, firstName, lastName, mainTitle, mainLocation, imageUrl } = user

    return (
      <TableRow key={id} className="programTableRow" hoverable>
        <TableRowColumn style={ProgPage.tableRowColAvatar}>
          <Link to={`/professional/${id}`}>
            <Avatar size={32} src={imageUrl} />
          </Link>
        </TableRowColumn>
        <TableRowColumn style={ProgPage.tableRowColName}>
          {firstName} {lastName}
        </TableRowColumn>
        <TableRowColumn style={ProgPage.tableRowColName}>
          {mainTitle} - {mainLocation}
        </TableRowColumn>
      </TableRow>
    )
  })
}

export default Program
