import React from 'react'
import { AppBar, IconButton } from 'material-ui'
import { StyledTextField } from '../../widgets/StyledTextField'
import { style } from '../../widgets/styles'
import { StyledPaper } from '../../widgets/StyledPaper'
import Company from 'material-ui/svg-icons/communication/business'
import { Field, reduxForm } from 'redux-form'
import GooglePlacesAutocomplete from '../../containers/placesAutocomplete'
import { validateAbout } from './validation'
import './editOrg.css'

const About = props => {
  const { handleSubmit, change } = props
  const Places = ({ input, updateAutocompleteField }) => (
    <GooglePlacesAutocomplete
      org
      {...input}
      resultsCallback={(results, status, searchText) =>
        updateAutocompleteField({ results, status, searchText })
      }
      formIndex={0}
    />
  )

  const updateAutocompleteField = data => {
    const { placesUpdateResult } = props
    change('address', data.results.formattedAddress)
    placesUpdateResult(data.results, 0)
  }

  return (
    <StyledPaper>
      <div className="orgSectionGrid">
        <div>
          <AppBar
            iconElementLeft={
              <IconButton>
                <Company />
              </IconButton>
            }
            title={<span style={style.title}>Information</span>}
            iconStyleLeft={style.appBar}
            style={style.organizationAppBar}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="orgFieldsGrid">
            <div>
              <Field
                name="name"
                component={StyledTextField}
                text="Organization Name"
                required
                multiLine
                org
              />
            </div>
            <div className="edit-org-address">
              <Field
                name="address"
                component={Places}
                updateAutocompleteField={data => updateAutocompleteField(data)}
              />
            </div>
            <div>
              <Field
                name="url"
                component={StyledTextField}
                text="Website Link"
                org
              />
            </div>
            <div>
              <Field
                name="description"
                component={StyledTextField}
                text="Description"
                multiLine
                org
              />
            </div>
          </div>
        </form>
      </div>
    </StyledPaper>
  )
}

export default reduxForm({
  form: 'about',
  enableReinitialize: true,
  validate: validateAbout
})(About)
