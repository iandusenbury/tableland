import React from 'react'
import { Polyline } from 'react-google-maps'

const startOpacity = 0.5
const defaultBounds = {
  north: 0.0,
  east: 0.0,
  south: 0.0,
  west: 0.0
}

const buildPolylineGroup = (i, index, nodes) => {
  const children = []
  // Returns an opacity based on index in array (higher index -> higher opacity)
  const opacity = (length, spot) =>
    startOpacity + (spot + 1) / length * (1 - startOpacity)

  // build polylines
  let n = index + 1

  // polyline to next parent
  const nextParent = (
    <Polyline
      key={i}
      path={[nodes[index].location, nodes[i].location]}
      options={{
        strokeColor: 'orange',
        strokeOpacity: `${opacity(nodes.length, i)}`
      }}
    />
  )

  while (n < nodes.length && n < i) {
    // polylines from parent to children
    children.push(
      <Polyline
        key={n}
        path={[nodes[index].location, nodes[n].location]}
        options={{ strokeColor: 'green', strokeOpacity: '0.5' }}
      />
    )
    n += 1
  }

  return { children, nextParent }
}

export const buildBounds = locations => {
  const locationData = []
  const bounds = defaultBounds
  const boundExtension = 0.3
  if (locations && locations.length > 0) {
    locations.forEach(node => {
      if (node.organization) {
        locationData.push({
          lat: parseFloat(node.organization.lat),
          lng: parseFloat(node.organization.lng)
        })
      }
    })

    const latitudes = locationData.map(location => location.lat)
    const longitudes = locationData.map(location => location.lng)

    bounds.north = Math.max(...latitudes)
    bounds.south = Math.min(...latitudes)
    bounds.east = Math.max(...longitudes)
    bounds.west = Math.min(...longitudes)
  }
  // If there is only one point, or groups of points clumped together
  if (bounds.north - bounds.south < 1) {
    bounds.north += boundExtension
    bounds.south -= boundExtension
  }
  if (bounds.east - bounds.west < 1) {
    bounds.east += boundExtension
    bounds.west -= boundExtension
  }

  return bounds
}

export const buildPolylines = experiences => {
  const experienceNodes = []

  experiences.forEach(experience => {
    if (experience.organization) {
      experienceNodes.push(experience)
    }
  })

  const polylines = [] // Polylines, array of objects -> {children, nextParent}

  const nodes = experienceNodes.map(experience => ({
    location: {
      lat: parseFloat(experience.organization.lat),
      lng: parseFloat(experience.organization.lng)
    },
    start: Date.parse(experience.startDate),
    end: Date.parse(experience.endDate)
  }))

  // identify parent nodes
  if (nodes.length > 1) {
    for (let index = 0; index < nodes.length; ) {
      // ------------ Search for children ------------------ //
      let i = index + 1
      while (i < nodes.length && nodes[i].start < nodes[index].end) {
        i += 1
      }

      // ------------ Build array of polylines ------------- //
      if (i < nodes.length) {
        polylines.push(buildPolylineGroup(i, index, nodes))
      } else if (i === nodes.length && index !== nodes.length - 1) {
        // ---------- End of array case ------------- //
        polylines.push(buildPolylineGroup(i - 1, index, nodes))
      }
      index = i // Assign index to next parent node index
    }
  }

  return polylines
}
