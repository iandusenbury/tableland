import React from 'react'
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
import TopTab from '../../constants/tabs/tabViewMap'
import './style.css'
import ViewStyles from '../../constants/viewStyles'
/*
  Employees should be listed as
  [icon/photo]  [name]  [position]
*/

const hasVideo = true
const portraitImg = require('./portrait.png')
const sampleImg = require('./sample.jpg')

export default props => (
  <div className="mainDiv">
    <TopTab className="tab" />
    <div className="image">
      <Card>
        <CardMedia
          overlay={<CardTitle id="org_name" title="Organization name here" />}>
          <img src={sampleImg} alt="" />
        </CardMedia>
      </Card>
    </div>
    <div className="text">
      <div className="name">
        <p>Organization Name</p>
        <Divider />
      </div>
      <div className="contact">
        <div className="address">
          <BusinessIcon style={ViewStyles.orgBusinessIcon} />
          <div>
            <p>123 company rd</p>
            <p>Portland, OR 97006</p>
          </div>
        </div>
        <div className="url">
          <LanguageIcon style={ViewStyles.orgUrlIcon} />
          <div style={ViewStyles.orgUrlp}>
            <p>url</p>
          </div>
        </div>
      </div>
      <div className="description">
        <Divider />
        <p>Description</p>
        {hasVideo && (
          <div style={ViewStyles.orgVideoDiv}>
            <video style={ViewStyles.orgVideoTag} />
          </div>
        )}
        <Divider />
      </div>
      <div className="employees">
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={ViewStyles.orgTableHeaderCol} />
              <TableHeaderColumn>Employee</TableHeaderColumn>
              <TableHeaderColumn>Job Title</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover displayRowCheckbox={false}>
            <TableRow className="tableRow" hoverable>
              <TableRowColumn style={ViewStyles.orgTableRowColAvatar}>
                <Avatar size={32} src={portraitImg} />
              </TableRowColumn>
              <TableRowColumn>Fred Henderson</TableRowColumn>
              <TableRowColumn>Engineer</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
)
