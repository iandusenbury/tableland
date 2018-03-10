import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleMarker, fetchProfessional } from '../../actions'
import { buildBounds } from '../../components/map/build'

import Map from '../../components/map'

const mapStateToProps = state => {
  // Determines current user or other profile's roadmap
  const { signedIn } = state.app.user
  const { loading } = state.app.isLoading
  const profile =
    !loading && signedIn && state.routing.location.pathname === '/'
      ? state.app.user
      : state.app.professionalPage

  const { experiences, media: { image: { url } } } = profile

  const refs = {
    map: undefined
  }
  const sortedExperiences = experiences.sort(
    (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate)
  )
  const bounds = buildBounds(experiences)

  const onMapMounted = ref => {
    refs.map = ref
    if (refs.map) {
      refs.map.fitBounds(bounds)
    }
  }
  const onPanTo = (index, location) => {
    const boundExtension = 0.2
    const newBounds = {
      north: location.lat + boundExtension,
      south: location.lat - boundExtension,
      east: location.lng + boundExtension,
      west: location.lng - boundExtension
    }
    refs.map.panTo(location)
    refs.map.fitBounds(newBounds)
  }
  const onPanOut = () => {
    refs.map.fitBounds(bounds)
  }

  return {
    profileImage: url,
    profile,
    sortedExperiences,
    ...state.app.isLoading,
    ...state.app.roadmap,
    onPanTo,
    onPanOut,
    onMapMounted
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMarker,
      fetchProfessional
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Map)
