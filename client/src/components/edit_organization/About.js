import React from 'react'
import { AppBar, IconButton } from 'material-ui'
import { StyledTextField } from '../../widgets/StyledTextField'
import { style } from '../../widgets/styles'
import { StyledPaper } from '../../widgets/StyledPaper'
import Company from 'material-ui/svg-icons/communication/business'
import './editOrg.css'

export const About = () => (
  <StyledPaper>
    <div className="orgSectionGrid">
      <div>
        <AppBar
          iconElementLeft={
            <IconButton>
              <Company />
            </IconButton>
          }
          title={<span style={style.title}>Information</span>}
          iconStyleLeft={style.appBar}
          style={style.organizationAppBar}
        />
      </div>
      <div className="orgFieldsGrid">
        <div>
          <StyledTextField text="Organization Name" org />
        </div>
        <div>
          <StyledTextField text="Address" org />
        </div>
        <div>
          <StyledTextField text="City" disabled />
        </div>
        <div>
          <StyledTextField text="State" disabled />
        </div>
        <div>
          <StyledTextField text="Postal Code" disabled />
        </div>
        <div>
          <StyledTextField text="Country" disabled />
        </div>
        <div>
          <StyledTextField text="Description" multiLine org />
        </div>
        <div>
          <StyledTextField text="Website Link" org multiLine />
        </div>
      </div>
    </div>
  </StyledPaper>
)
