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

export const buildBounds = locations => {
  const locationData = []
  locations.forEach(node => {
    if (node.organization) {
      locationData.push({
        lat: parseFloat(node.organization.lat),
        lng: parseFloat(node.organization.lng)
      })
    }
  }) // LatLng objects
  let north
  let east
  let south
  let west
  const bounds = {
    north,
    east,
    south,
    west
  }

  const latitudes = locationData.map(location => location.lat)
  const longitudes = locationData.map(location => location.lng)

  bounds.north = Math.max(...latitudes)
  bounds.south = Math.min(...latitudes)
  bounds.east = Math.max(...longitudes)
  bounds.west = Math.min(...longitudes)

  return bounds
}

export const buildMarkers = experiences => {
  const markers = []

  experiences.forEach((experience, index) => {
    if (experience.organization) {
      const location = { lat: parseFloat(experience.organization.lat), lng: parseFloat(experience.organization.lng) }
      const marker = (
        <Marker key={index} label={index.toString()} position={location}>
        </Marker>
      )
      markers.push(marker)
    }
  })
  return markers
}

export const buildPolylines = experiences => {
  // const experienceNodes = experiences.map((node, index) => {
  //   const location = { lat: node.organization.lat, lng: node.organization.lng }
  //   const marker = (
  //     <Marker key={index} label={index.toString()} position={location} />
  //   )
  //   return {
  //     ...node,
  //     marker
  //   }
  // })
  const experienceNodes = []

  experiences.forEach(experience => {
    if (experience.organization) {
      // const location = { lat: parseFloat(experience.organization.lat), lng: parseFloat(experience.organization.lng) }
      // experience.marker = (
      //   <Marker key={index} label={index.toString()} position={location}>
      //   </Marker>
      // )
      experienceNodes.push(experience)
    }
  })

  const polylines = [] // Polylines, array of objects -> {children, nextParent}

  const nodes = experienceNodes.map(experience => ({
    location: { lat: parseFloat(experience.organization.lat), lng: parseFloat(experience.organization.lng) },
    start: experience.startDate,
    end: experience.endDate
  }))

  // identify parent nodes
  if (nodes.length > 1) {
    for (let index = 0; index < nodes.length; ) {
      // if (index === nodes.length - 1) {
      //   break
      // }

      // const prio = nodes[index].priority
      const children = [] // Polylines to concurrent experiences (nodes)
      let nextParent // Polyline to next parent
      const polyline = {
        children,
        nextParent
      }

      // ------------ Search for children ------------------ //
      let i = index + 1
      while (
        i < nodes.length &&
        // nodes[i].priority >= prio &&
        nodes[i].start < nodes[index].end
      ) {
        i += 1
      }

      // ------------ Build array of polylines ------------- //
      if (i < nodes.length) {
        // parentNodes.push(nodes[i])
        // build polylines
        let n = index + 1
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
        // polyline to next parent
        nextParent = (
          <Polyline
            key={i}
            path={[nodes[index].location, nodes[i].location]}
            options={{ strokeColor: 'orange' }}
          />
        )
        polyline.children = children
        polyline.nextParent = nextParent
        polylines.push(polyline)
      } else {
        // ---------- End of array case ------------- //
        let n = index + 1
        while (n < nodes.length && n < i - 1) {
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
        // polyline to next parent
        nextParent = (
          <Polyline
            key={i}
            path={[nodes[index].location, nodes[i - 1].location]}
            options={{ strokeColor: 'orange' }}
          />
        )
        // Push array of children polylines and nextParent polyline onto polylines array
        polyline.children = children
        polyline.nextParent = nextParent
        polylines.push(polyline)
      }
      index = i // Assign index to next parent node index
    }
  }

  // console.log('experience nodes: ', experienceNodes, 'polylines: ', polylines, 'bounds: ', bounds)
  // return { experienceNodes, polylines, bounds }
  return polylines
}
