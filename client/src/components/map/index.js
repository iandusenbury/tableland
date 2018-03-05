import React from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import mapStyle from './style.json'

/*
 * TODO:
 *    Improve with more specific styling
*/

/* eslint-disable no-unused-vars */
const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyARRsWk_FbczyZ0RFU4STmiTxxYfnWmiBs&v=3.exp&libraries=geometry,drawing',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: 'calc(100vh - 72px)' }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 45.516, lng: -122.679565 }}
    defaultOptions={{
      styles: mapStyle,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false
    }}
  />
))

export default MyMapComponent
