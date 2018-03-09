import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchMapProfessional, toggleMarker } from '../../actions'
import { buildBounds } from '../../components/map/build'

import Map from '../../components/map'

const portraitImg = require('../professional/portrait.png')

const mapStateToProps = state => {
  const { experiences, media } = state.app.professionalPage
  let profileImage
  if (media.image && media.image.url) {
    profileImage = media.image.url
  } else {
    profileImage = portraitImg
  }
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
    profileImage,
    ...state.app.professionalPage,
    sortedExperiences,
    ...state.app.roadmap,
    onPanTo,
    onPanOut,
    onMapMounted
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMapProfessional,
      toggleMarker,
      openProfile: id => push(`/users/${id}`)
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Map)
