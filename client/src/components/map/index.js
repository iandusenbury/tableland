import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Paper } from 'material-ui'
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

const firstMarkerImg = require('./first.png')
const currentMarkerImg = require('./current.png')

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
        <Paper style={styleJS.styles.paper} zDepth={3}>
          <div className="mapLegend">
            <h3>Legend</h3>
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src={firstMarkerImg} alt="first marker" />
                  </td>
                  <td>First Experience</td>
                </tr>
                <tr>
                  <td>
                    <img src={currentMarkerImg} alt="current marker" />
                  </td>
                  <td>Current Experience</td>
                </tr>
                <tr>
                  <td>
                    <svg height="5" width="28">
                      <path
                        d="M0 0 L28 0 Z"
                        style={{ stroke: 'orange', strokeWidth: '5' }}
                      />
                    </svg>
                  </td>
                  <td>Main Experience Path</td>
                </tr>
                <tr>
                  <td className="mapLegendConcurrent">
                    <svg height="5" width="28">
                      <path d="M0 0 L7 0 Z" />
                      <path d="M7 0 L14 0 Z" />
                      <path d="M14 0 L21 0 Z" />
                      <path d="M21 0 L28 0 Z" />
                    </svg>
                  </td>
                  <td>Concurrent Experience Paths</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Paper>
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
  sortedExperiences: PropTypes.array.isRequired, // eslint-disable-line
  fetchProfessional: PropTypes.func.isRequired
}

export default MyMapComponent
