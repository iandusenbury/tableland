import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { AppBar, IconButton } from 'material-ui'
import { StyledTextField } from '../../widgets/StyledTextField'
import './edit.css'
import { style } from '../../widgets/styles'
import Person from 'material-ui/svg-icons/social/person'
import { StyledPaper } from '../../widgets/StyledPaper'
import { showResults } from './index'

class Personal extends Component {
  componentWillMount() {
    this.props.initialize({ ...this.props })
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
                />
              </div>
              <div>
                <Field
                  name="lastName"
                  component={StyledTextField}
                  text="Last Name"
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
}

export default reduxForm({
  form: 'personal'
})(Personal)
