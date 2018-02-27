import React from 'react'
import { AppBar, IconButton } from 'material-ui'
import { style } from '../../widgets/styles'
import Photo from 'material-ui/svg-icons/image/add-a-photo'
import { StyledPaper } from '../../widgets/StyledPaper'
import { StyledTextField } from '../../widgets/StyledTextField'
import './edit.css'

const videoPlayer = require('./VideoPlaceholder.jpg')

export const Media = () => (
  <StyledPaper>
    <div className="EditSectionGrid">
      <div>
        <AppBar
          iconElementLeft={
            <IconButton>
              <Photo />
            </IconButton>
          }
          iconStyleLeft={style.appBar}
          title={<span style={style.title}>Media</span>}
        />
      </div>
      <div className="EditMediaGrid">
        <div>
          <StyledTextField text="Video URL" />
        </div>
        <div>
          <div className="EditVideo">
            <img className="EditImage" src={videoPlayer} />
          </div>
        </div>
      </div>
    </div>
  </StyledPaper>
)
