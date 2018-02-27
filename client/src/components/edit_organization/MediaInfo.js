import React from 'react'
import { AppBar, IconButton } from 'material-ui'
import { style } from '../../widgets/styles'
import Photo from 'material-ui/svg-icons/image/add-a-photo'
import { StyledPaper } from '../../widgets/StyledPaper'
import { StyledTextField } from '../../widgets/StyledTextField'
import './editOrg.css'

const videoPlayer = require('./video.png')

export const MediaInfo = () => (
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
          <StyledTextField text="Video URL" org multiLine />
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
