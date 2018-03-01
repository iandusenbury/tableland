import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import mapStyle from './style.json'
import { buildBounds, buildPolylines, buildMarkers } from './build'

/*
 * TODO:
 *    Improve with more specific styling
 * Key: AIzaSyARRsWk_FbczyZ0RFU4STmiTxxYfnWmiBs
 */

const GMap = withScriptjs(
  withGoogleMap(props => {
    const {
      onMapMounted,
      experiencesProp,
      polylines,
      markers,
      ...otherProps
    } = props
    return (
      <GoogleMap
        {...otherProps}
        zoom={12}
        ref={map => {
          onMapMounted(map)
        }}>
        {markers}
        {polylines.map(poly => poly.children)}
        {polylines.map(poly => poly.nextParent)}
      </GoogleMap>
    )
  })
)

class MyMapComponent extends Component {
  constructor(props) {
    super(props)
    this.handleMapMounted = this.handleMapMounted.bind(this)
  }

  componentWillMount() {
    const { fetchProfessional } = this.props
    fetchProfessional()
  }

  // When map is mounted, extend the bounds of the map view to fit all markers
  handleMapMounted(c) {
    const { experiences } = this.props
    const mapRef = c
    const bounds = buildBounds(experiences)

    if (mapRef) {
      mapRef.fitBounds(bounds)
    }
  }

  render() {
    const {
      // firstName,
      // lastName,
      // mainTitle,
      // profileImage,
      experiences
    } = this.props
    const sortedExperiences = experiences.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate))
    const polylines = buildPolylines(sortedExperiences)
    const markers = buildMarkers(sortedExperiences)
    return (
      <GMap
        markers={markers}
        polylines={polylines}
        onMapMounted={this.handleMapMounted}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyARRsWk_FbczyZ0RFU4STmiTxxYfnWmiBs&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `calc(100vh - 72px)` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={12}
        defaultCenter={{ lat: 45.516, lng: -122.679565 }}
        defaultOptions={{
          styles: mapStyle,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false
        }}
      />
    )
  }
}

MyMapComponent.propTypes = {
  experiences: PropTypes.array.isRequired,
  polylines: PropTypes.array.isRequired,
  fetchProfessional: PropTypes.func.isRequired
}

export default MyMapComponent
