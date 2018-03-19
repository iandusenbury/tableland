import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { placesUpdateSearchText, placesUpdateData } from '../../actions'
import PlacesExample from '../../components/placesAutocomplete'

const mapStateToProps = state => ({
  ...state.app.places
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      placesUpdateData
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(PlacesExample)
