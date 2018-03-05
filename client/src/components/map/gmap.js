import React from 'react'
import { compose } from 'recompose'
import { FlatButton } from 'material-ui'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'
import { buildPolylines } from './build'

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

const GMap = compose(withScriptjs, withGoogleMap)(props => {
  const {
    onMapMounted,
    experiencesProp,
    isMarkerOpen,
    onToggleOpen,
    onPanTo,
    onPanOut,
    sortedExperiences,
    ...otherProps
  } = props
  const polylines = buildPolylines(sortedExperiences)
  const experienceOrgs = []
  sortedExperiences.forEach(experience => {
    if (experience.organization) {
      experienceOrgs.push(experience)
    }
  })
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
                <InfoWindow onCloseClick={() => onToggleOpen(index)}>
                  <div>
                    <h2>{name}</h2>
                    <p>{title}</p>
                    <p>
                      {getDate(startDate)} - {getDate(endDate)}
                    </p>
                    <FlatButton
                      primary
                      onClick={() => onPanTo(index, location)}>
                      Pan To
                    </FlatButton>
                    <FlatButton primary onClick={() => onPanOut()}>
                      Pan Out
                    </FlatButton>
                    <p
                      style={{
                        position: 'absolute',
                        right: '2px',
                        bottom: '4px'
                      }}>
                      {index + 1}
                    </p>
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

export default GMap
