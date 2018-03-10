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
import { getDate } from '../../constants/dates'
import './style.css'

const firstMarkerImg = require('../../assets/icons/first.png')
const currentMarkerImg = require('../../assets/icons/current.png')
const defaultMarkerImg = require('../../assets/icons/default.png')

const getExperienceOverlapCount = (experiences, index, location) => {
  let count = 0
  const compareLocation = (first, second) =>
    first.lat === second.lat && first.lng === second.lng

  for (let j = 0; j < experiences.length; j += 1) {
    if (compareLocation(location, experiences[j].location) && j !== index) {
      count += 1
    }
  }

  return count
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
        let icon = index === 0 ? firstMarkerImg : defaultMarkerImg
        if (index === expLength - 1) icon = currentMarkerImg

        const count = getExperienceOverlapCount(experienceOrgs, index, location)

        const pluralizeOtherExpMessage = numExp => {
          if (numExp > 1) {
            return <p>{numExp} other experiences here</p>
          }
          return <p>{numExp} other experience here</p>
        }

        return (
          <Marker
            key={index} // eslint-disable-line
            onClick={() => onToggleOpen(index)}
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
                  {true && count > 0 && pluralizeOtherExpMessage(count)}
                  <p className="gMapInfoWindowP">{index + 1}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        )
      })}
      {polylines.map(poly => poly.children)}
      {polylines.map(poly => poly.nextParent)}
    </GoogleMap>
  )
})

export default GMap
