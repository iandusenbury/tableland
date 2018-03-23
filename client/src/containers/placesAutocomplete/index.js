import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { placesUpdateData, placesUpdateText } from '../../actions'
import PlacesExample from '../../components/placesAutocomplete'

const mapStateToProps = state => ({
  ...state.app.places
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      placesUpdateData,
      placesUpdateText
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(PlacesExample)
