import React, { Component } from 'react'
import { FieldArray, Field, reduxForm, getFormValues } from 'redux-form'
import { RaisedButton } from 'material-ui'
import { DatePicker } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'

import { style } from '../../widgets/styles'
import { StyledSelectField } from '../../widgets/StyledSelectField'
import { StyledTextField } from '../../widgets/StyledTextField'

import { validateExperiences} from './validation'
import './experience.css'

const renderExistingExp = ({ fields }) => (
  <div>
    {fields.map((exp, index) => (
      <div key={index}>
        <div className="EditOuterDiv">
          <div>
            <Field
              name={`${exp}.name`}
              component={StyledTextField}
              text="Name of Organization"
              disabled
            />
          </div>
          <div>
            <Field
              name={`${exp}.position`}
              component={StyledTextField}
              text="Position/Role"
              required
              dynamicRequired
            />
          </div>
          <div>
            <Field
              name={`${exp}.current`}
              component={StyledSelectField}
              text="Current Position?">
              <MenuItem value={false} primaryText="No" />
              <MenuItem value primaryText="Yes" />
            </Field>
          </div>
          <div>
            <Field
              name={`${exp}.award`}
              component={StyledTextField}
              text="Awards Received"
              multiLine
            />
          </div>
          <div className="edit-experience-date-wrapper">
            <Field
              name={`${exp}.startDate`}
              component={DatePicker}
              style={style.datePicker}
              hintText="Start Date"
              container="inline"
              mode="portrait"
              required
            />
          </div>
          <div className="edit-experience-date-wrapper">
            <Field
              name={`${exp}.endDate`}
              component={DatePicker}
              style={style.datePicker}
              hintText="End Date"
              container="inline"
              mode="portrait"
            />
          </div>
        </div>
          <div style={{width: '73vw'}}>
              <Field
                  name={`${exp}.address`}
                  component={StyledTextField}
                  text="Address"
                  disabled
                  fullWidth
              />
          </div>
        <div>
          <FieldArray name={`${exp}.programs`} component={renderPrograms} />
        </div>
      </div>
    ))}
  </div>
)

const renderPrograms = ({ fields }) => (
  <div>
    <div style={{ width: '50vw', marginLeft: '15%', marginRight: '15%' }}>
      <RaisedButton
        onClick={() => fields.push({})}
        label="Programs"
        primary
        fullWidth
        disabled
      />
    </div>
    {fields.map((program, index) => (
      <div
        key={index}
        style={{ width: '75vw', marginBottom: '2%', marginTop: '2%' }}>
        <div className="EditOuterDiv" style={{ backgroundColor: '#F0FFFF' }}>
          <div>
            <Field
              name={`${program}.name`}
              component={StyledTextField}
              text="Name of Program"
              required
              dynamicRequired
            />
          </div>
          <div>
            <Field
              name={`${program}.position`}
              component={StyledTextField}
              text="Position/Role"
              required
              dynamicRequired
            />
          </div>
          <div>
            <Field
              name={`${program}.current`}
              component={StyledSelectField}
              text="Current Position?">
              <MenuItem value={false} primaryText="No" />
              <MenuItem value primaryText="Yes" />
            </Field>
          </div>
          <div>
            <Field
              name={`${program}.award`}
              component={StyledTextField}
              text="Awards Received"
              multiLine
            />
          </div>
          <div className="edit-experience-date-wrapper">
            <Field
              name={`${program}.startDate`}
              component={DatePicker}
              style={style.datePicker}
              hintText="Start Date"
              container="inline"
              mode="portrait"
            />
          </div>
          <div className="edit-experience-date-wrapper">
            <Field
              name={`${program}.endDate`}
              component={DatePicker}
              style={style.datePicker}
              hintText="End Date"
              container="inline"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
)

class ExistingExperiences extends Component {
  componentDidMount() {

  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <FieldArray name="existingExp" component={renderExistingExp} />
      </form>
    )
  }
}

export default reduxForm({
  form: 'existingExperiences',
  enableReinitialize: true,
  validate: validateExperiences
})(ExistingExperiences)

/*
<div style={{width: "75vw", marginTop: '3%', marginBottom: '3%'}}>
    <RaisedButton label="update" onClick={() => submit('existingExperiences')} primary={true} fullWidth={true}/>
</div>
*/
