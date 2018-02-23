import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MyMapComponent from '../../components/map'
import { buildRoadMap } from '../../actions'

const mapStateToProps = state => ({
  markers: state.app.roadMap.markers,
  polylines: state.app.roadMap.polylines,
  bounds: state.app.roadMap.bounds
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      buildRoadMap
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(MyMapComponent)
