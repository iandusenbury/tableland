import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Paper, RaisedButton } from 'material-ui'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
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
      currentMarker,
      isMarkerOpen,
      toggleMarker,
      onPanTo,
      onPanOut,
      onMapMounted
    } = this.props

    const experienceOrgs = []
    sortedExperiences.forEach(experience => {
      if (experience.organization) {
        experience.location = { // eslint-disable-line
          lat: parseFloat(experience.organization.lat),
          lng: parseFloat(experience.organization.lng)
        }
        experienceOrgs.push(experience)
      }
    })
    const expLength = experienceOrgs.length
    const isEmptyExperiece = expLength === 0

    let prevIndex
    let isFirstIndex
    let prevLocation

    let nextIndex
    let isLastIndex
    let nextLocation
    if (expLength > 0) {
      prevIndex = currentMarker - 1 >= 0 ? currentMarker - 1 : 0
      isFirstIndex = currentMarker === 0
      prevLocation = experienceOrgs[prevIndex].location

      nextIndex =
        currentMarker + 1 < expLength ? currentMarker + 1 : expLength - 1
      isLastIndex = currentMarker === expLength - 1
      nextLocation = experienceOrgs[nextIndex].location
    }
    return (
      <div className="mapMainDiv">
        <GMap
          experienceOrgs={experienceOrgs}
          isMarkerOpen={isMarkerOpen}
          onToggleOpen={toggleMarker}
          onPanTo={onPanTo}
          onPanOut={onPanOut}
          onMapMounted={onMapMounted}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyARRsWk_FbczyZ0RFU4STmiTxxYfnWmiBs&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div className="mapLoadingElement" />}
          containerElement={<div className="mapContainerElement" />}
          mapElement={<div className="mapMapElement" />}
          defaultZoom={12}
          defaultCenter={{ lat: 45.516, lng: -122.679565 }}
          defaultOptions={{
            styles: mapStyle,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        />
        <Paper style={styleJS.styles.legend} zDepth={3}>
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
        <div className="mapPanNavigation">
          <RaisedButton
            style={styleJS.styles.panButtonTo}
            disabled={isEmptyExperiece}
            onClick={() =>
              onPanTo(currentMarker, experienceOrgs[currentMarker].location)
            }>
            Pan To
          </RaisedButton>
          <RaisedButton
            style={styleJS.styles.panButtonTo}
            disabled={isEmptyExperiece}
            onClick={() => onPanOut()}>
            Pan Out
          </RaisedButton>
        </div>
        <div className="mapNavigation">
          <RaisedButton
            style={styleJS.styles.navButtonLeft}
            disabled={isFirstIndex || isEmptyExperiece}
            onClick={() => {
              toggleMarker(prevIndex)
              onPanTo(prevIndex, prevLocation)
            }}>
            <ChevronLeft style={styleJS.styles.chevron} />
          </RaisedButton>
          <RaisedButton
            style={styleJS.styles.navButtonRight}
            disabled={isLastIndex || isEmptyExperiece}
            onClick={() => {
              toggleMarker(nextIndex)
              onPanTo(nextIndex, nextLocation)
            }}>
            <ChevronRight style={styleJS.styles.chevron} />
          </RaisedButton>
        </div>
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
  fetchProfessional: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  mainTitle: PropTypes.string, // eslint-disable-line
  profileImage: PropTypes.string.isRequired,
  sortedExperiences: PropTypes.array.isRequired, // eslint-disable-line
  currentMarker: PropTypes.number.isRequired,
  isMarkerOpen: PropTypes.array.isRequired, // eslint-disable-line
  toggleMarker: PropTypes.func.isRequired,
  onPanTo: PropTypes.func.isRequired,
  onPanOut: PropTypes.func.isRequired,
  onMapMounted: PropTypes.func.isRequired
}

export default MyMapComponent
