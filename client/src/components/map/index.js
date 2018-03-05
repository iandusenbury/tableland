import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'material-ui'
import GMap from './gmap'
import mapStyle from './style.json'
import BottomTab from '../../constants/tabs/tabViewProfile'
import './style.css'
import styleJS from './style'

/*
 * TODO:
 *    Improve with more specific styling
 * Key: AIzaSyARRsWk_FbczyZ0RFU4STmiTxxYfnWmiBs
 */

class MyMapComponent extends Component {
  componentWillMount() {
    const { fetchProfessional } = this.props
    fetchProfessional()
  }

  render() {
    const {
      firstName,
      lastName,
      mainTitle,
      profileImage,
      sortedExperiences,
      isMarkerOpen,
      toggleMarker,
      onPanTo,
      onPanOut,
      onMapMounted
    } = this.props

    return (
      <div style={{ height: `calc(100vh - 56px)` }}>
        <GMap
          sortedExperiences={sortedExperiences}
          isMarkerOpen={isMarkerOpen}
          onToggleOpen={toggleMarker}
          onPanTo={onPanTo}
          onPanOut={onPanOut}
          onMapMounted={onMapMounted}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyARRsWk_FbczyZ0RFU4STmiTxxYfnWmiBs&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
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
        <div className="mapProfilePreviewTab">
          <div className="mapProfilePreviewAvatar">
            <Avatar
              style={styleJS.styles.avatar}
              size={styleJS.avatarSize}
              src={profileImage}
            />
          </div>
          <div className="mapProfilePreviewInfo">
            <h3 className="mapProfilePreviewHeader">
              {firstName} {lastName}
            </h3>
            <p className="mapProfilePreviewTitle">{mainTitle}</p>
          </div>
        </div>
        <BottomTab />
      </div>
    )
  }
}

MyMapComponent.propTypes = {
  sortedExperiences: PropTypes.array.isRequired,
  fetchProfessional: PropTypes.func.isRequired
}

export default MyMapComponent
