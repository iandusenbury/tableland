import React from 'react'
import { AppBar, IconButton } from 'material-ui'
import { StyledTextField } from '../../widgets/StyledTextField'
import { style } from '../../widgets/styles'
import Person from 'material-ui/svg-icons/social/person'
import { StyledPaper } from '../../widgets/StyledPaper'
import './edit.css'

export const Personal = () => (
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
