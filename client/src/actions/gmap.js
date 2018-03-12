import { push } from 'react-router-redux'
import ActionTypes from '../constants/actionTypes'
import callApi from '../utils/api'

export function initUserMap(response, dispatch, getState) {
  const { payload: { user: { id } } } = response
  const { routing: { location: { pathname } } } = getState()

  return initMap(response, dispatch).then(() => {
    // Route to roadmap ONLY if on home page
    if (pathname === '/') dispatch(push(`/roadmap/${id}`))
  })
}

export function fetchMapProfessional(userID = 'random') {
  const callDescriptor = {
    endpoint: `/users/${userID}`,
    types: [
      ActionTypes.REQUEST_PROFESSIONAL,
      ActionTypes.RECIEVE_PROFESSIONAL,
      ActionTypes.FAILURE_PROFESSIONAL
    ]
  }

  return dispatch =>
    dispatch(callApi(callDescriptor, { onSuccess: initMapPush }))
}

export function initMapPush(response, dispatch) {
  return initMap(response, dispatch).then(() => {
    dispatch(push('/'))
  })
}

export function initMap(response, dispatch) {
  const { payload: { user: { experiences } } } = response
  const isMarkerOpen = []
  const sortedExperiences = experiences.sort(
    (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate)
  )

  sortedExperiences.forEach(experience => {
    if (experience.organization) {
      if (experience.current) {
        isMarkerOpen.push(true)
      } else {
        isMarkerOpen.push(false)
      }
    }
  })

  const initMarkers = markerArray => ({
    type: ActionTypes.INIT_MAP_INFO,
    payload: {
      isMarkerOpen: markerArray
    }
  })

  return dispatch(initMarkers(isMarkerOpen))
}

export function toggleMarker(index) {
  return {
    type: ActionTypes.UPDATE_OPEN_MARKERS,
    payload: {
      index
    }
  }
}

export function toggleLegend() {
  return {
    type: ActionTypes.TOGGLE_LEGEND
  }
}
