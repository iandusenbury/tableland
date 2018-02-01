import React from 'react'
import ReactDOM from 'react-dom'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'
import mapStyle from './style.json'

/*
 * TODO:
 *    Remove Map/Satellite option   (maybe)           (Done)
 *    Remove Streetview option      (probably)        (Done)
 *    Remove Fullscreen option      (probably)        (Done)
 *    Import map style from JSON    (Needs to happen) (Done!)
 *    Improve above with more specific styling
*/

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyARRsWk_FbczyZ0RFU4STmiTxxYfnWmiBs&v=3.exp&libraries=geometry,drawing,places',
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `88vh` }} />,
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
    }} />
))

export default MyMapComponent
