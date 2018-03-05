import React from 'react'
import { AppBar, IconButton } from 'material-ui'
import './experience.css'
import { style } from '../../widgets/styles'
import Location from 'material-ui/svg-icons/communication/location-on'
import { StyledPaper } from '../../widgets/StyledPaper'
import AddExperience from './AddExperience'

export const Experience = props => (
  <StyledPaper>
    <div className="EditBoxGrid">
      <div className="EditLeft">
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
      <div className="EditRight">
        <AddExperience />
      </div>
    </div>
  </StyledPaper>
)
