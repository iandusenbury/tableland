import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import mapStyle from './style.json'

/*
 * TODO:
 *    Improve with more specific styling
*/

const GMap = withScriptjs(
  withGoogleMap(props => {
    const { onMapMounted, markers, polylines, ...otherProps } = props
    return (
      <GoogleMap
        {...otherProps}
        ref={c => {
          onMapMounted(c)
        }}>
        {markers.map(marker => marker)}
        {polylines.map(poly => poly.children.map(child => child))}
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
    const { buildRoadMap } = this.props
    buildRoadMap()
  }

  // When map is mounted, extend the bounds of the map view to fit all markers
  handleMapMounted(c) {
    let { mapRef } = this.props
    const { bounds } = this.props
    mapRef = c
    mapRef.fitBounds(bounds)
  }

  render() {
    const { markers, polylines } = this.props

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
  markers: PropTypes.node.isRequired,
  polylines: PropTypes.node.isRequired,
  bounds: PropTypes.node.isRequired,
  mapRef: PropTypes.node.isRequired,
  buildRoadMap: PropTypes.func.isRequired
}

export default MyMapComponent
