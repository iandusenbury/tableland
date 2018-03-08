import React from 'react'
import { compose } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'
import { buildPolylines } from './build'
import './style.css'

const firstMarkerImg = require('./first.png')
const currentMarkerImg = require('./current.png')
const defaultMarkerImg = require('./default.png')

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
    date = new Date(date.toString()) // eslint-disable-line
    date = `${monthNames[date.getMonth()]} ${date.getFullYear()}` // eslint-disable-line
  } else date = 'Current' // eslint-disable-line

  return date
}

// const getShortDate = date => {
//   if (date !== null) {
//     date = new Date(date.toString())
//     const year = date.getFullYear() % 100
//     date = `${date.getMonth() + 1}/${year}`
//   } else date = 'Current'
//
//   return date
// }

const getExperienceOverlapInfo = (experiences, index, location) => {
  let count = 0
  let isLast = false

  // experiences.forEach(experience => {
  for (let i = experiences.length - 1; i >= 0; i -= 1) {
    if (location === experiences[i].location) {
      isLast = true
      break
    }
  }
  for (let i = 0; i < experiences.length; i += 1) {
    if (location === experiences[i].location && i !== index) {
      count += 1
    }
  }

  return { count, isLast }
}

const GMap = compose(withScriptjs, withGoogleMap)(props => {
  const {
    onMapMounted,
    isMarkerOpen,
    onToggleOpen,
    onPanTo,
    onPanOut,
    experienceOrgs,
    ...otherProps
  } = props
  const polylines = buildPolylines(experienceOrgs)
  const expLength = experienceOrgs.length
  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      {...otherProps}>
      {experienceOrgs.map((experience, index) => {
        const { location } = experience
        const { organization: { name }, title, startDate, endDate } = experience
        // const label = endDate ? getShortDate(startDate) : `Now`
        let icon = index === 0 ? firstMarkerImg : defaultMarkerImg
        if (index === expLength - 1) icon = currentMarkerImg

        const { count, isLast } = getExperienceOverlapInfo(
          experienceOrgs,
          index,
          location
        )

        // const prevIndex = index - 1 >= 0 ? index - 1 : 0
        // const isFirstIndex = index === 0
        // const prevLocation = experienceOrgs[prevIndex].location
        //
        // const nextIndex = index + 1 < expLength ? index + 1 : expLength - 1
        // const isLastIndex = index === expLength - 1
        // const nextLocation = experienceOrgs[nextIndex].location

        return (
          <div key={index}>
            {isLast && (
              <Marker
                // key={index} // eslint-disable-line
                onClick={() => onToggleOpen(index)}
                // label={label}
                icon={icon}
                position={location}>
                {isMarkerOpen[index] && (
                  <InfoWindow onCloseClick={() => onToggleOpen(index)}>
                    <div>
                      <h2>{name}</h2>
                      <p>{title}</p>
                      <p>
                        {getDate(startDate)} - {getDate(endDate)}
                      </p>
                      {isLast &&
                        count > 0 && <p>{count} other experiences here</p>}
                      <p className="gMapInfoWindowP">{index + 1}</p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            )}
          </div>
        )
      })}
      {polylines.map(poly => poly.children)}
      {polylines.map(poly => poly.nextParent)}
    </GoogleMap>
  )
})

export default GMap
