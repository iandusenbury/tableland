import React from 'react'
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

export default props => (
  <div className='mainDiv'>
    <TopTab className='tab' />
    <div className='image'>
      <Card>
        <CardMedia
          overlay={
            <div className='avatarDiv'>
              <Avatar className='avatarStyle' size={200} src={portraitImg} />
              <Paper className='paperStyle' zDepth={5}>
                <h1>[Job Title] at [Organization]</h1>
              </Paper>
            </div>}>
          <img src={sampleImg} alt='' />
        </CardMedia>
      </Card>
    </div>
    <div className='text'>
      <div className='name'>
        <h3>[First Name] [Last Name]</h3>
        <Divider />
      </div>
      <div className='contact'>
        <div className='url'>
          <div>
            <LanguageIcon style={orgPage.urlIcon} />
          </div>
          <div>
            <p>www.linkedin.com/in/[vanityname]</p>
          </div>
        </div>
      </div>
      <div className='description'>
        <Divider />
        <p>Description</p>
        {hasVideo && (
          <div>
            <video /> {/* placeholder, has linting error here */}
          </div>
        )}
        <Divider />
      </div>
      <div className='employees'>
        <List>
          <ListItem leftIcon={<Domain />}>
            <h4>[Organization name] - [Job Title]</h4>
            <p>[start date] - [end date]</p>
            <p>[Award(s)]</p>
            <ListItem leftIcon={<Group />}>
              <h4>[Program] - [Job Title]</h4>
              <p>[Start Date] - [End Date]</p>
              <p>[Award(s)]</p>
            </ListItem>
            <ListItem leftIcon={<Group />}>
              <h4>[Program] - [Job Title]</h4>
              <p>[Start Date] - [End Date]</p>
              <p>[Award(s)]</p>
            </ListItem>
          </ListItem>
          <ListItem leftIcon={<Domain />}>
            <h4>[Organization name] - [Job Title]</h4>
            <p>[start date] - [end date]</p>
            <p>[Award(s)]</p>
          </ListItem>
          <ListItem leftIcon={<Domain />}>
            <h4>[Organization name] - [Job Title]</h4>
            <p>[start date] - [end date]</p>
            <p>[Award(s)]</p>
          </ListItem>
          <ListItem leftIcon={<Domain />}>
            <h4>[Organization name] - [Job Title]</h4>
            <p>[start date] - [end date]</p>
            <p>[Award(s)]</p>
          </ListItem>
        </List>
      </div>
    </div>
  </div>
)
