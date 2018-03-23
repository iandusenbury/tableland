import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { AppBar, IconButton, Avatar } from 'material-ui'
import './edit.css'
import { style } from '../../widgets/styles'
import Photo from 'material-ui/svg-icons/image/add-a-photo'
import { StyledPaper } from '../../widgets/StyledPaper'
import { StyledTextField } from '../../widgets/StyledTextField'
import { validateMedia } from './validation'
import './edit.css'

class Media extends Component {
  componentDidMount() {
    // this.props.initialize({ ...this.props })
  }

  render() {
    const { handleSubmit } = this.props

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
            </div>
          </form>
        </div>
      </StyledPaper>
    )
  }
}

Media = reduxForm({
  form: 'media',
  enableReinitialize: true,
  validate: validateMedia
})(Media)

export default Media
