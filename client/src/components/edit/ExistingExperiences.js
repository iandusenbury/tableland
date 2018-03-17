import React, { Component } from 'react'
import './experience.css'
import { style } from '../../widgets/styles'
import { FieldArray, Field, reduxForm, getFormValues } from 'redux-form'
import { StyledSelectField } from '../../widgets/StyledSelectField'
import { StyledTextField } from '../../widgets/StyledTextField'
import { DatePicker } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import { RaisedButton } from 'material-ui'
import { printResults } from './index'

function filterExp(experiences) {
  const organizations = []
  const programs = []

  experiences.map((exp, index) => {
    const { award, current, id, title, type, organization, program } = exp

    let { endDate, startDate } = exp
    if (!endDate) {
      endDate = ''
    } else {
      endDate = new Date(endDate)
    }

    startDate = new Date(startDate)
    let orgExp
    let progExp
    let address
    if (organization) {
      if (
        organization.addressLine1 &&
        organization.addressLine2 &&
        organization.addressLine3
      ) {
        address =
          organization.addressLine1 +
          organization.addressLine2 +
          organization.addressLine3
      } else if (
        organization.addressLine1 &&
        organization.addressLine2 &&
        !organization.addressLine3
      ) {
        address = organization.addressLine1 + organization.addressLine2
      } else if (
        organization.addressLine1 &&
        !organization.addressLine2 &&
        !organization.addressLine3
      ) {
        address = organization.addressLine1
      } else {
        address = ''
      }

      // clean this up
      orgExp = {
        name: organization.name,
        address,
        city: organization.city,
        country: organization.country,
        state: organization.state,
        postal: organization.postalCode,
        description: organization.description,
        position: title,
        award,
        id: organization.id,
        current,
        endDate,
        startDate,
        type,
        expId: id,
        programs: []
      }

      organizations.push(orgExp)
    } else if (program) {
      progExp = {
        name: program.name,
        description: program.description,
        parentOrganization: exp.parentOrganization,
        position: title,
        award,
        id,
        current,
        endDate,
        startDate,
        type,
        expId: id
      }

      programs.push(progExp)
    }
  })

  programs.map((prog, index) => {
    organizations.map((org, index) => {
      if (prog.parentOrganization == org.id) {
        org.programs.push(prog)
      }
    })
  })

  return organizations
}

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
            />
          </div>
          <div>
            <Field
              name={`${exp}.position`}
              component={StyledTextField}
              text="Position/Role"
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
          <div style={{ marginTop: '6%' }}>
            <Field
              name={`${exp}.startDate`}
              component={DatePicker}
              style={style.datePicker}
              hintText="Start Date"
              mode="landscape"
            />
          </div>
          <div style={{ marginTop: '6%' }}>
            <Field
              name={`${exp}.endDate`}
              component={DatePicker}
              style={style.datePicker}
              hintText="End Date"
              mode="landscape"
            />
          </div>
          <div>
            <Field
              name={`${exp}.address`}
              component={StyledTextField}
              text="Address"
              multiLine
              disabled
            />
          </div>
          <div>
            <Field
              name={`${exp}.city`}
              component={StyledTextField}
              text="City"
              disabled
            />
          </div>
          <div>
            <Field
              name={`${exp}.state`}
              component={StyledTextField}
              text="State"
              disabled
            />
          </div>
          <div>
            <Field
              name={`${exp}.postal`}
              component={StyledTextField}
              text="Postal Code"
              disabled
            />
          </div>
          <div>
            <Field
              name={`${exp}.country`}
              component={StyledTextField}
              text="Country"
              disabled
            />
          </div>
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
        onClick={() => fields.push()}
        label="Add Program"
        primary
        fullWidth
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
            />
          </div>
          <div>
            <Field
              name={`${program}.position`}
              component={StyledTextField}
              text="Position/Role"
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
          <div>
            <Field
              name={`${program}.startDate`}
              component={DatePicker}
              style={style.datePicker}
              hintText="Start Date"
              mode="landscape"
            />
          </div>
          <div>
            <Field
              name={`${program}.endDate`}
              component={DatePicker}
              style={style.datePicker}
              hintText="End Date"
              mode="landscape"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
)

class ExistingExperiences extends Component {
  componentDidMount() {
    const { experiences } = this.props
    const exp = {
      existingExp: filterExp(experiences)
    }

    this.props.initialize(exp)
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

ExistingExperiences = reduxForm({
  form: 'existingExperiences'
})(ExistingExperiences)

export default ExistingExperiences

/*
<div style={{width: "75vw", marginTop: '3%', marginBottom: '3%'}}>
    <RaisedButton label="update" onClick={() => submit('existingExperiences')} primary={true} fullWidth={true}/>
</div>
*/
