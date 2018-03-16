import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import GooglePlacesAutocomplete from '../../containers/placesAutoComplete'

const Places = ({ input, updateSuggestion }) => (
  <GooglePlacesAutocomplete
    {...input}
    results={results => updateSuggestion(results)}
  />
)

const AddressInput = props => {
  const { change } = props
  return (
    <form>
      <Field
        name="autocomplete"
        component={Places}
        updateSuggestion={data => change('autocomplete', data)}
      />
    </form>
  )
}

AddressInput.propTypes = {
  change: PropTypes.func.isRequired
}

Places.propTypes = {
  input: PropTypes.object.isRequired, // eslint-disable-line
  updateSuggestion: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'places'
})(AddressInput)
