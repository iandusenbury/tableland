import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { AppBar, IconButton } from 'material-ui'
import PropTypes from 'prop-types'
import Photo from 'material-ui/svg-icons/image/add-a-photo'
import './edit.css'
import { style } from '../../widgets/styles'
import { StyledPaper } from '../../widgets/StyledPaper'
import { StyledTextField } from '../../widgets/StyledTextField'
import { validateMedia } from './validation'

const Media = props => {
  const { handleSubmit } = props

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

Media.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'media',
  enableReinitialize: true,
  validate: validateMedia
})(Media)
