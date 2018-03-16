import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import PlacesForm from '../../components/placesAutocompleteForm'

const resultsSelector = formValueSelector('places')

const mapStateToProps = state => {
  const resultsData = resultsSelector(state, 'autocomplete')

  return {
    resultsData
  }
}

export default connect(mapStateToProps, null)(PlacesForm)
