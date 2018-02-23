import React from 'react'
import { Paper, AppBar, IconButton } from 'material-ui'
import { StyledTextField } from '../../widgets/StyledTextField'
import './edit.css'
import { style } from '../../widgets/styles'
import Person from 'material-ui/svg-icons/social/person'
import { StyledPaper } from '../../widgets/StyledPaper'

export const Personal = props => (
  <StyledPaper>
    <div className="EditSectionGrid">
      <div>
        <AppBar
          iconElementLeft={
            <IconButton>
              <Person />
            </IconButton>
          }
          title={<span style={style.title}>Personal</span>}
          iconStyleLeft={style.appBar}
        />
      </div>
      <div className="EditFieldsGrid">
        <div>
          <StyledTextField text="First Name" />
        </div>
        <div>
          <StyledTextField text="Last Name" />
        </div>
        <div>
          <StyledTextField text="About" multiLine />
        </div>
        <div>
          <StyledTextField text="Current Job Title" disabled />
        </div>
      </div>
    </div>
  </StyledPaper>
)
