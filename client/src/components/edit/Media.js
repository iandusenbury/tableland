import React from 'react'
import { AppBar, IconButton, Avatar } from 'material-ui'
import './edit.css'
import { style } from '../../widgets/styles'
import Photo from 'material-ui/svg-icons/image/add-a-photo'
import { StyledPaper } from '../../widgets/StyledPaper'
import { StyledTextField } from '../../widgets/StyledTextField'

const videoPlayer = require('./VideoPlaceholder.jpg')

export const Media = props => (
  <StyledPaper>
    <div className="sectionGrid">
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
      <div className="mediaGrid">
        <div>
          <StyledTextField text="Video URL" />
        </div>
        <div>
          <div className="video">
            <img className="image" src={videoPlayer} />
          </div>
        </div>
      </div>
    </div>
  </StyledPaper>
)
