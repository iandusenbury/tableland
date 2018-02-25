import React from 'react'
import { AppBar, IconButton } from 'material-ui'
import './editOrg.css'
import { style } from '../../widgets/styles'
import Photo from 'material-ui/svg-icons/image/add-a-photo'
import { StyledPaper } from '../../widgets/StyledPaper'
import { StyledTextField } from '../../widgets/StyledTextField'
import { orange400 } from 'material-ui/styles/colors'

const videoPlayer = require('./video.png')

export const MediaInfo = props => (
  <StyledPaper>
    <div className="OrgSectionGrid">
      <div>
        <AppBar
          iconElementLeft={
            <IconButton>
              <Photo />
            </IconButton>
          }
          iconStyleLeft={style.appBar}
          title={<span style={style.title}>Media</span>}
          style={style.organizationAppBar}
        />
      </div>
      <div className="OrgMediaGrid">
        <div>
          <StyledTextField text="Video URL" org />
        </div>
        <div>
          <div className="OrgVideo">
            <img className="OrgImage" src={videoPlayer} />
          </div>
        </div>
      </div>
    </div>
  </StyledPaper>
)
