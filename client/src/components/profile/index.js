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
  Avatar,
  List,
  ListItem
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
          overlay={<CardTitle id="org_name" title="User name here?" />}>
          <img src={sampleImg} alt="" />
        </CardMedia>
      </Card>
    </div>
    <div className="text">
      <div className="name">
        <p>[First Name] [Last Name]</p>
        <Divider />
      </div>
      <div className="title">
      </div>
      <div className="contact">
        <div className="url">
          <div>
            <LanguageIcon style={ViewStyles.orgUrlIcon} />
          </div>
          <div style={ViewStyles.orgUrlp}>
            <p>www.linkedin.com/in/username</p>
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
      <div className="experience">
        <List>
          <ListItem>
            <h4>[Organization name] * [Job Title]</h4>
            <p>[start date] - [end date]</p>
            <p>[Award(s)]</p>
            <List>
              <ListItem>
                <h4>[Program Name] * [Job Title]</h4>
                <p>[start date] - [end date]</p>
                <p>[Award(s)]</p>
              </ListItem>
            </List>
          </ListItem>
          <ListItem>
            <h4>[Organization name] * [Job Title]</h4>
            <p>[start date] - [end date]</p>
            <p>[Award(s)]</p>
          </ListItem>
          <ListItem>
            <h4>[Organization name] * [Job Title]</h4>
            <p>[start date] - [end date]</p>
            <p>[Award(s)]</p>
          </ListItem>
        </List>
      </div>
    </div>
  </div>
)
