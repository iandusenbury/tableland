import React from 'react'
import { AppBar, IconButton } from 'material-ui'
import Location from 'material-ui/svg-icons/communication/location-on'

import { style } from '../../widgets/styles'
import { StyledPaper } from '../../widgets/StyledPaper'
import AddExperience from './AddExperience'
import './experience.css'

const Experience = () => (
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

export default Experience
