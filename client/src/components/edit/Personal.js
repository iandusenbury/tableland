import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { AppBar, IconButton } from 'material-ui'
import { StyledTextField } from '../../widgets/StyledTextField'
import './edit.css'
import { style } from '../../widgets/styles'
import Person from 'material-ui/svg-icons/social/person'
import { StyledPaper } from '../../widgets/StyledPaper'
import { fetchProfessional } from '../../actions'

class Personal extends Component {
  componentDidMount() {
    this.props.initialize({ ...this.props })
  }

  render() {
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
          <form>
            <div className="EditFieldsGrid">
              <div>
                <Field
                  name="first_name"
                  component={StyledTextField}
                  text="First Name"
                  initialValue={Personal.first_name}
                />
              </div>
              <div>
                <Field
                  name="last"
                  component={StyledTextField}
                  text="Last Name"
                />
              </div>
              <div>
                <Field
                  name="about"
                  component={StyledTextField}
                  text="About"
                  multiLine
                />
              </div>
              <div>
                <Field
                  name="job"
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
