import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { placesUpdateData, placesUpdateText, placesUpdateResult } from '../../actions'
import PlacesExample from '../../components/placesAutocomplete'

const mapStateToProps = state => ({
  ...state.app.places
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      placesUpdateData,
      placesUpdateText,
      placesUpdateResult
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(PlacesExample)
