import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Avatar, Paper, RaisedButton, IconButton } from 'material-ui'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import GMap from './gmap'
import mapStyle from './style.json'
import BottomTab from '../../widgets/tabs/tabViewProfile'
import Loading from '../loading'
import './style.css'
import styleJS from './style'

/*
 * TODO:
 *    Improve with more specific styling
 * Key: AIzaSyARRsWk_FbczyZ0RFU4STmiTxxYfnWmiBs
 */

const firstMarkerImg = require('../../assets/icons/first.png')
const currentMarkerImg = require('../../assets/icons/current.png')

class MyMapComponent extends Component {
  componentDidMount() {
    const { fetchProfessional, match, toggleLegend, isLegendShown } = this.props
    if (match && match.params) {
      fetchProfessional(match.params.id)
    } else {
      fetchProfessional('random')
    }
    if (isLegendShown && window.innerWidth < 620) {
      toggleLegend()
    }
  }

  render() {
    const { loading } = this.props
    if (loading) return <Loading />

    const {
      profile: { id, firstName, lastName, mainTitle, media: { image } },
      sortedExperiences,
      currentMarker,
      isMarkerOpen,
      toggleMarker,
      onPanTo,
      onPanOut,
      onMapMounted,
      toggleLegend,
      isLegendShown
    } = this.props

    const experienceOrgs = sortedExperiences.filter(
      experience => experience.organization && experience.organization.id
    )
    experienceOrgs.forEach(experience => {
      experience.location = { // eslint-disable-line
        lat: parseFloat(experience.organization.lat),
        lng: parseFloat(experience.organization.lng)
      }
    })

    const expLength = experienceOrgs.length
    const isEmptyExperiece = expLength === 0

    const prevIndex = currentMarker - 1 >= 0 ? currentMarker - 1 : 0
    const isFirstIndex = currentMarker === 0

    const nextIndex =
      currentMarker + 1 < expLength ? currentMarker + 1 : expLength - 1
    const isLastIndex = currentMarker === expLength - 1

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
          defaultCenter={{ lng: -122.6765, lat: 45.5231 }}
          defaultOptions={{
            styles: mapStyle,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        />
        <Paper style={styleJS.styles.legend} zDepth={3}>
          <div className="mapLegend">
            <div className="mapLegendHeader">
              <h3>Legend</h3>
              <div>
                <IconButton
                  onClick={() => toggleLegend()}
                  disableTouchRipple
                  style={styleJS.styles.legend.iconButton}>
                  <ExpandMore />
                </IconButton>
              </div>
            </div>
            {isLegendShown && (
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="mapLegendFirstIcon">
                        <img src={firstMarkerImg} alt="first marker" />
                      </div>
                    </td>
                    <td>First Experience</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="mapLegendSecondIcon">
                        <img src={currentMarkerImg} alt="current marker" />
                      </div>
                    </td>
                    <td>Current Experience</td>
                  </tr>
                  <tr>
                    <td>
                      <svg height="5" width="32">
                        <path
                          d="M0 0 L32 0 Z"
                          style={{ stroke: 'orange', strokeWidth: '5' }}
                        />
                      </svg>
                    </td>
                    <td>Main Path</td>
                  </tr>
                  <tr>
                    <td className="mapLegendConcurrent">
                      <svg height="5" width="32">
                        <path d="M0 0 L8 0 Z" />
                        <path d="M8 0 L16 0 Z" />
                        <path d="M16 0 L24 0 Z" />
                        <path d="M24 0 L32 0 Z" />
                      </svg>
                    </td>
                    <td>Concurrent Paths</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </Paper>
        <div className="map-navigation-toggle">
          {expLength > 0 && (
            <div>
              <div className="mapPanNavigation">
                <RaisedButton
                  style={styleJS.styles.panButtonTo}
                  disabled={isEmptyExperiece}
                  onClick={() =>
                    onPanTo(currentMarker, experienceOrgs[currentMarker].location)
                  }>
                  Zoom To
                </RaisedButton>
                <RaisedButton
                  style={styleJS.styles.panButtonTo}
                  disabled={isEmptyExperiece}
                  onClick={() => onPanOut()}>
                  Zoom Out
                </RaisedButton>
              </div>
              <div className="mapNavigation">
                <RaisedButton
                  style={styleJS.styles.navButtonLeft}
                  disabled={isFirstIndex || isEmptyExperiece}
                  onClick={() => {
                    toggleMarker(prevIndex)
                    onPanTo(prevIndex, experienceOrgs[prevIndex].location)
                  }}>
                  <ChevronLeft style={styleJS.styles.chevron} />
                </RaisedButton>
                <RaisedButton
                  style={styleJS.styles.navButtonRight}
                  disabled={isLastIndex || isEmptyExperiece}
                  onClick={() => {
                    toggleMarker(nextIndex)
                    onPanTo(nextIndex, experienceOrgs[nextIndex].location)
                  }}>
                  <ChevronRight style={styleJS.styles.chevron} />
                </RaisedButton>
              </div>
            </div>
          )}
        </div>
        <div className="mapProfilePreviewTab">
          <div className="mapProfilePreviewAvatar">
            <Avatar
              style={styleJS.styles.avatar}
              size={styleJS.avatarSize}
              src={image.url}
            />
          </div>
          <div className="mapProfilePreviewInfo">
            <h3 className="mapProfilePreviewHeader">
              {firstName} {lastName}
            </h3>
            <p className="mapProfilePreviewTitle">{mainTitle}</p>
          </div>
        </div>
        <Link to={`/professional/${id}`}>
          <BottomTab />
        </Link>
      </div>
    )
  }
}

MyMapComponent.propTypes = {
  profile: PropTypes.object.isRequired, // eslint-disable-line
  match: PropTypes.object, // eslint-disable-line
  sortedExperiences: PropTypes.array.isRequired, // eslint-disable-line
  fetchProfessional: PropTypes.func.isRequired,
  currentMarker: PropTypes.number.isRequired,
  isMarkerOpen: PropTypes.array.isRequired, // eslint-disable-line
  toggleMarker: PropTypes.func.isRequired,
  onPanTo: PropTypes.func.isRequired,
  onPanOut: PropTypes.func.isRequired,
  onMapMounted: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleLegend: PropTypes.func.isRequired,
  isLegendShown: PropTypes.bool.isRequired
}

export default MyMapComponent
