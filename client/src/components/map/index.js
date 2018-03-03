import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'
import { compose, withHandlers, withStateHandlers } from 'recompose'
import { Avatar, FlatButton } from 'material-ui'
import mapStyle from './style.json'
import { buildBounds, buildPolylines } from './build'
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
      experiences
    } = this.props
    const sortedExperiences = experiences.sort(
      (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate)
    )
    const bounds = buildBounds(experiences)
    const experienceOrgs = []
    let experienceLength = 0
    sortedExperiences.forEach(experience => {
      if (experience.organization) {
        experienceLength += 1
        experienceOrgs.push(experience)
      }
    })

    const GMap = compose(
      withHandlers(() => {
        const refs = {
          map: undefined
        }

        return {
          onMapMounted: () => ref => {
            refs.map = ref
            if (refs.map) {
              refs.map.fitBounds(bounds)
            }
          },
          onPanTo: () => (index, location) => {
            const boundExtension = 0.1
            const newBounds = {
              north: location.lat + boundExtension,
              south: location.lat - boundExtension,
              east: location.lng + boundExtension,
              west: location.lng - boundExtension
            }
            refs.map.panTo(location)
            refs.map.fitBounds(newBounds)
          },
          onPanOut: () => () => {
            refs.map.fitBounds(bounds)
          }
        }
      }),
      withStateHandlers(
        () => {
          const isMarkerOpen = []
          for (let i = 0; i < experienceLength - 1; i += 1) {
            isMarkerOpen.push(false)
          }
          isMarkerOpen.push(true)
          return {
            isMarkerOpen
          }
        },
        {
          onToggleOpen: ({ isMarkerOpen }) => indexClicked => {
            for (let i = 0; i < isMarkerOpen.length; i += 1) {
              if (i === indexClicked) {
                isMarkerOpen[i] = true
              } else {
                isMarkerOpen[i] = false
              }
            }
            // isMarkerOpen[indexClicked] = !isMarkerOpen[indexClicked]
            return isMarkerOpen
          }
        }
      ),
      withScriptjs,
      withGoogleMap
    )(props => {
      const {
        onMapMounted,
        experiencesProp,
        // markers,
        // isMarkerShown,
        isMarkerOpen,
        onToggleOpen,
        onPanTo,
        onPanOut,
        // toggleMarkerFlag,
        ...otherProps
      } = props
      const polylines = buildPolylines(sortedExperiences)

      return (
        <GoogleMap
          ref={props.onMapMounted}
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
          {...otherProps}>
          {experienceOrgs.map((experience, index) => {
            if (experience.organization) {
              const location = {
                lat: parseFloat(experience.organization.lat),
                lng: parseFloat(experience.organization.lng)
              }
              // This const defines months for use in following function
              const monthNames = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
              ]
              // This function takes a date string as an argument and returns a string in the format
              // [mon] [year]
              const getDate = date => {
                if (date !== null) {
                  date = new Date(date.toString())
                  date = `${monthNames[date.getMonth()]} ${date.getFullYear()}`
                } else date = 'Current'

                return date
              }

              const getShortDate = date => {
                if (date !== null) {
                  date = new Date(date.toString())
                  const year = date.getFullYear() % 100
                  date = `${date.getMonth() + 1}/${year}`
                } else date = 'Current'

                return date
              }

              const {
                organization: { name },
                title,
                startDate,
                endDate
              } = experience

              const label = endDate ? getShortDate(startDate) : `Now`

              return (
                <Marker
                  key={index}
                  onClick={() => onToggleOpen(index)}
                  // label={label}
                  // icon={require('./mapIcon.png')}
                  position={location}>
                  {isMarkerOpen[index] && (
                    <InfoWindow>
                      <div>
                        <h2>{name}</h2>
                        <p>{title}</p>
                        <p>
                          {getDate(startDate)} - {getDate(endDate)}
                        </p>
                        <FlatButton primary onClick={() => onPanTo(index, location)}>Pan To</FlatButton>
                        <FlatButton primary onClick={() => onPanOut()}>Pan Out</FlatButton>
                        <p style={{position: 'absolute', right:'2px', bottom:'4px'}}>{index + 1}</p>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              )
            }
            return null
          })}
          {polylines.map(poly => poly.children)}
          {polylines.map(poly => poly.nextParent)}
        </GoogleMap>
      )
    })

    return (
      <div style={{ height: `calc(100vh - 56px)`}}>
        <GMap
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
            <Avatar style={styleJS.styles.avatar} size={styleJS.avatarSize} src={profileImage} />
          </div>
          <div className="mapProfilePreviewInfo">
            <h3 className="mapProfilePreviewHeader">{firstName} {lastName}</h3>
            <p className="mapProfilePreviewTitle">{mainTitle}</p>
          </div>
        </div>
        <BottomTab />
      </div>
    )
  }
}

MyMapComponent.propTypes = {
  experiences: PropTypes.array.isRequired,
  fetchProfessional: PropTypes.func.isRequired
}

export default MyMapComponent
