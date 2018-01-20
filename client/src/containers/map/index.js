import React from 'react'
import { connect } from 'react-redux'
import { GoogleMapReact } from 'google-map-react'

const GoogleMap = () => {
  return (
    <div>
      <h1>Map</h1>
      <p>Welcome to the map page!</p>
    </div>
  )
}

export default connect()(GoogleMap)
