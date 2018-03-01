import React from 'react'
import { Marker, Polyline, InfoWindow } from 'react-google-maps'

// Nodes, consists of a timeline and location and priority level
/*
const nodes = [
  {
    start: 0,
    end: randEndTime(0),
    location: { lat: randLat(), lng: randLong() },
    priority: randPrio()
  },
]
*/
const startOpacity = 0.5
const defaultBounds = {
  north: 0.0,
  east: 0.0,
  south: 0.0,
  west: 0.0
}

const buildPolylineGroup = (i, index, nodes) => {
  const children = []
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

  return bounds
}

export const buildMarkers = experiences => {
  const markers = []
  const experienceOrgs = []
  experiences.forEach(experience => {
    if (experience.organization) {
      experienceOrgs.push(experience)
    }
  })

  experienceOrgs.forEach((experience, index) => {
    const location = {
      lat: parseFloat(experience.organization.lat),
      lng: parseFloat(experience.organization.lng)
    }
    const marker = (
      <Marker key={index} label={index.toString()} position={location}>
        {index === experienceOrgs.length - 1 && (
          <InfoWindow>
            <div>
              <h3>{experience.organization.name}</h3>
              <p>{experience.title}</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    )
    markers.push(marker)
  })
  return markers
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
