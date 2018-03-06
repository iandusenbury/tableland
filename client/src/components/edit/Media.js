import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { AppBar, IconButton, Avatar } from 'material-ui'
import './edit.css'
import { style } from '../../widgets/styles'
import Photo from 'material-ui/svg-icons/image/add-a-photo'
import { StyledPaper } from '../../widgets/StyledPaper'
import { StyledTextField } from '../../widgets/StyledTextField'

const videoPlayer = require('./VideoPlaceholder.jpg')

class Media extends Component {
  render() {
    return (
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
          <form>
            <div className="EditMediaGrid">
              <div>
                <Field
                  name="video"
                  text="Video URL"
                  component={StyledTextField}
                />
              </div>
              <div>
                <div className="EditVideo">
                  <img className="EditImage" src={videoPlayer} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </StyledPaper>
    )
  }
}

Media = reduxForm({
  form: 'addExperience',
  initialValues: {
  }
})(Media)

export default Media
