import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import GooglePlacesAutocomplete from '../../containers/placesAutocomplete'

const Places = ({ input, updateAutocompleteField }) => (
  <GooglePlacesAutocomplete
    {...input}
    resultsCallback={(results, status) =>
      updateAutocompleteField({ results, status })
    }
  />
)

const AddressInput = props => {
  const { change, resultsData } = props
  const updateAutocompleteField = data => {
    change('autocomplete', data)
  }
  return (
    <div>
      <p>Enter an address</p>
      <Field
        name="autocomplete"
        component={Places}
        updateAutocompleteField={updateAutocompleteField}
      />
      {resultsData && <p>Status: {resultsData.status}</p>}
      {resultsData && (
        <p>
          Whole Formatted Address: {resultsData.results[0].formatted_address}
        </p>
      )}
      {resultsData && (
        <div>
          <p>Lat: {resultsData.results[0].geometry.location.lat()}</p>
          <p>Lng: {resultsData.results[0].geometry.location.lng()}</p>
        </div>
      )}
    </div>
  )
}

AddressInput.propTypes = {
  change: PropTypes.func.isRequired,
  resultsData: PropTypes.object // eslint-disable-line
}

Places.propTypes = {
  input: PropTypes.object.isRequired, // eslint-disable-line
  updateAutocompleteField: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'places'
})(AddressInput)
