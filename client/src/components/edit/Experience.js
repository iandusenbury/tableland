import React from 'react'
import { AppBar, IconButton } from 'material-ui'
import { style } from '../../widgets/styles'
import Location from 'material-ui/svg-icons/communication/location-on'
import { StyledPaper } from '../../widgets/StyledPaper'
import { AddExperience } from './AddExperience'
import './experience.css'

export const Experience = () => (
  <StyledPaper>
    <div className="editBoxGrid">
      <div className="editLeft">
        <AppBar
          iconElementLeft={
            <IconButton>
              <Location />
            </IconButton>
          }
          title={<span style={style.title}>Experiences</span>}
          iconStyleLeft={style.appBar}
        />
      </div>
      <div className="editRight">
        <AddExperience />
      </div>
    </div>
  </StyledPaper>
)
