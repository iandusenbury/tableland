import React from 'react'
import { Marker, Polyline } from 'react-google-maps'

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

const extendBounds = locations => {
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

  const latitudes = locations.map(location => location.lat)
  const longitudes = locations.map(location => location.lng)

  bounds.north = Math.max(...latitudes)
  bounds.south = Math.min(...latitudes)
  bounds.east = Math.max(...longitudes)
  bounds.west = Math.min(...longitudes)

  return bounds
}

const buildMap = (nodes) => {
  const markers = nodes.map((node, index) => (
    node.marker = <Marker key={index} label={index.toString()} position={node.location} />
  ))

  const parentNodes = [] // Nodes for main roadmap path
  const polylines = [] // Polylines, array of objects -> {children, nextParent}
  const locations = nodes.map(node => node.location) // LatLng objects
  const bounds = extendBounds(locations)

  parentNodes.push(nodes[0])

  // identify parent nodes
  if (nodes.length > 1) {
    for (let index = 0; index < nodes.length; ) {
      // if (index === nodes.length - 1) {
      //   break
      // }

      const prio = nodes[index].priority
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
        nodes[i].priority >= prio &&
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

  return { markers, polylines, bounds }
}

export default buildMap
