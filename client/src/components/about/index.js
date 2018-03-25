import React from 'react'
import { RaisedButton, Paper } from 'material-ui'

import './style.css'

const githubIcon = require('../../assets/icons/GitHub-Mark-32px.png')
const MESAIcon = require('../../assets/images/MESA_logo.svg')

export default () => (
  <div className="about-main-div">
    <div className="about-inner-div">
      <Paper className="about-paper" zDepth={2}>
        <h1 className="about-header-one">About MESA</h1>

        <h3 className="about-header-three">Mission</h3>
        <p className="about-mission">
          To provide students underrepresented in the fields of mathematics,
          engineering, science, and technology with the skills, knowledge, and
          opportunities to develop their talents, explore technology-based
          careers, enter college, and compete successfully in the workforce.
        </p>

        <div className="about-mesa-button-wrapper">
          <RaisedButton
            href="http://oregonmesa.org/about-mesa"
            backgroundColor="#ff9e15"
            label="Learn more about MESA"
            fullWidth
          />
        </div>
      </Paper>
      <Paper className="about-paper">
        <h2 className="about-header-one">About This App</h2>
        <p className="about-text">
          MESA Roadmaps lets users plot out their career, including education
          and work experiences, as well as clubs, activities, and other programs
          they were involved in at these institutions. The user's career is then
          laid out on a Google Maps interface. The app is designed for students
          interested in STEM to see just how professionals in the field got to
          where they are and to see all the different routes that lead to
          success.
        </p>
      </Paper>
      <Paper className="about-paper">
        <h2 className="about-header-one">About Us</h2>
        <p className="about-text">Created by</p>
        <div className="about-text">
          <p>Ian Dusenbury</p>
          <p>Theodore Mason</p>
          <p>Matthew Balleza</p>
          <p>Dan Crayne</p>
          <p>Halala Khoshnaw</p>
          <p>Evan White</p>
          <p>Daniel J. Arredondo</p>
        </div>
        <p className="about-text">
          for capstone senior project at Portland State University for
          OregonMESA
        </p>
      </Paper>
      <Paper className="about-paper">
        <p className="about-text">
          <a href="https://oregonmesa.org">
            <img className="about-mesa-logo" src={MESAIcon} alt="" />
          </a>
        </p>
        <p className="about-text">
          View us on Github{' '}
          <a href="https://github.com/iandusenbury/tableland">
            <img className="about-github-icon" src={githubIcon} alt="" />
          </a>
        </p>
      </Paper>
    </div>
  </div>
)
