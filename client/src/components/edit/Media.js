import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { AppBar, IconButton, Avatar } from 'material-ui'
import './edit.css'
import { style } from '../../widgets/styles'
import Photo from 'material-ui/svg-icons/image/add-a-photo'
import { StyledPaper } from '../../widgets/StyledPaper'
import { StyledTextField } from '../../widgets/StyledTextField'
import {showResults} from "./index";

const videoPlayer = require('./VideoPlaceholder.jpg')

class Media extends Component {

  componentDidMount(){
    this.props.initialize({...this.props})
  }

  render() {
    const {handleSubmit} = this.props
    const videoImage = this.props.profileVideo ? 'EditImageWithVideo' : 'EditImageNoVideo'
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
          <form onSubmit={handleSubmit}>
            <div className="EditMediaGrid">
              <div>
                <Field
                  name="profileVideo"
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
  form: 'media',
  onSubmit: showResults
})(Media)

export default Media
