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

  componentDidMount(){
    this.props.initialize({...this.props})
  }

  render() {
    const videoImage = this.props.video ? 'EditImageWithVideo' : 'EditImageNoVideo'
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
                  multiLine
                />
              </div>
              <div>
                <div className="EditVideo">
                  <img className={videoImage} src={videoPlayer} />
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
  form: 'media'
})(Media)

export default Media
