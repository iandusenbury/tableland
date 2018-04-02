import React from 'react'
import './experience.css'
import { style } from '../../widgets/styles'
import { FieldArray, Field, reduxForm, reset } from 'redux-form'
import { StyledSelectField } from '../../widgets/StyledSelectField'
import { StyledTextField } from '../../widgets/StyledTextField'
import { DatePicker } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import { RaisedButton } from 'material-ui'
import GooglePlacesAutocomplete from '../../containers/placesAutocomplete'
import { validateExperiences } from './validation'

const afterSubmit = (result, dispatch) => dispatch(reset('newExperiences'))

const renderPrograms = ({ fields }) => (
  <div>
    <div style={{ width: '50vw', marginLeft: '15%', marginRight: '15%' }}>
      <RaisedButton
        onClick={() => fields.push({})}
        label="Add Program"
        style={{
          marginTop: '3%',
          marginBottom: '3%'
        }}
        fullWidth
        primary
      />
    </div>
    {fields.map((program, index) => (
      <div
        key={index}
        style={{ width: '60vw', marginBottom: '2%', marginTop: '2%' }}>
        <div className="EditOuterDiv" style={{ backgroundColor: '#F0FFFF' }}>
          <div>
            <Field
              name={`${program}.name`}
              component={StyledTextField}
              text="Name of Program"
              required
            />
          </div>
          <div>
            <Field
              name={`${program}.position`}
              component={StyledTextField}
              text="Position/Role"
              required
            />
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
              mode="portrait"
              required
            />
          </div>
          <div className="edit-experience-date-wrapper">
            <Field
              name={`${program}.endDate`}
              component={DatePicker}
              style={style.datePicker}
              hintText="End Date"
              mode="portrait"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
)

const NewExperiences = props => {
  const { handleSubmit, change, placesUpdateResult } = props
  const Places = ({
    input,
    updateAutocompleteField,
    meta: { error: errorText },
    formIndex
  }) => (
    <GooglePlacesAutocomplete
      {...input}
      resultsCallback={(results, status, searchText) =>
        updateAutocompleteField({ results, status, searchText })
      }
      errorText={errorText}
      formIndex={formIndex}
    />
  )

  const updateAutocompleteField = (data, exp) => {
    change(`${exp}.address`, data.results.formattedAddress)
    placesUpdateResult(data.results, `${exp}`)
  }

  const renderNewExp = ({ fields }) => (
    <div>
      <div style={{ marginTop: '4%', marginBottom: '4%', width: '60vw' }}>
        <RaisedButton
          onClick={() => fields.push({})}
          label="Add Experiences"
          fullWidth
          secondary
        />
      </div>
      <div>
        {fields.map((exp, index) => (
          <div key={index}>
            <div className="EditOuterDiv">
              <div>
                <Field
                  name={`${exp}.name`}
                  component={StyledTextField}
                  text="Name of Organization"
                  required
                />
              </div>
              <div>
                <Field
                  name={`${exp}.position`}
                  component={StyledTextField}
                  text="Position/Role"
                  required
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
                  mode="portrait"
                />
              </div>
            </div>
            <div style={{ width: '60vw' }}>
              <Field
                name={`${exp}.address`}
                component={Places}
                updateAutocompleteField={data =>
                  updateAutocompleteField(data, exp)
                }
                required
                formIndex={`${exp}`}
              />
            </div>
            <div>
              <FieldArray name={`${exp}.programs`} component={renderPrograms} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="newExp" component={renderNewExp} />
    </form>
  )
}

export default reduxForm({
  form: 'newExperiences',
  onSubmitSuccess: afterSubmit,
  enableReinitialize: true,
  validate: validateExperiences
})(NewExperiences)
