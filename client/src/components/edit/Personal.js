import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { AppBar, IconButton } from 'material-ui'
import Person from 'material-ui/svg-icons/social/person'
import PropTypes from 'prop-types'
import { StyledTextField } from '../../widgets/StyledTextField'
import { style } from '../../widgets/styles'
import { StyledPaper } from '../../widgets/StyledPaper'

import './edit.css'

const Personal = props => {
  const { handleSubmit } = props

  return (
    <StyledPaper>
      <div className="EditSectionGrid">
        <div>
          <AppBar
            iconElementLeft={
              <IconButton>
                <Person />
              </IconButton>
            }
            title={<span style={style.title}>Personal</span>}
            iconStyleLeft={style.appBar}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="EditFieldsGrid">
            <div>
              <Field
                name="firstName"
                component={StyledTextField}
                text="First Name"
                required
              />
            </div>
            <div>
              <Field
                name="lastName"
                component={StyledTextField}
                text="Last Name"
                required
              />
            </div>
            <div>
              <Field
                name="description"
                component={StyledTextField}
                text="About"
                multiLine
              />
            </div>
            <div>
              <Field
                name="mainTitle"
                component={StyledTextField}
                text="Current Job Title"
                disabled
              />
            </div>
          </div>
        </form>
      </div>
    </StyledPaper>
  )
}

Personal.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'personal',
  enableReinitialize: true
})(Personal)
