import Cookies from 'cookies-js'
import ActionTypes from '../constants/actionTypes'
import callApi from '../utils/api'
import { authorizeOAuth } from './oauth'

// fetch User
export function fetchUser() {
  const callDescriptor = {
    endpoint: `/users/current`,
    types: [
      ActionTypes.REQUEST_USER,
      ActionTypes.RECIEVE_USER,
      ActionTypes.FAILURE_USER
    ]
  }

  return dispatch => {
    dispatch(callApi(callDescriptor))
  }
}

// Fetch Professional
export function fetchProfessional() {
  const callDescriptor = {
    endpoint: `/users/random`,
    types: [
      ActionTypes.REQUEST_PROFESSIONAL,
      ActionTypes.RECIEVE_PROFESSIONAL,
      ActionTypes.FAILURE_PROFESSIONAL
    ]
  }

  return dispatch => {
    dispatch(callApi(callDescriptor, { onSuccess: initMapMarkers }))
  }
}

function initMapMarkers(response, dispatch) {
  const { payload: { user: { experiences } } } = response
  const isMarkerOpen = []
  const sortedExperiences = experiences.sort(
    (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate)
  )
  let experienceLength = 0
  sortedExperiences.forEach(experience => {
    if (experience.organization) {
      experienceLength += 1
    }
  })
  for (let i = 0; i < experienceLength - 1; i += 1) {
    isMarkerOpen.push(false)
  }
  isMarkerOpen.push(true)

  const dispatchFunc = markerArray => ({
    type: ActionTypes.INIT_MAP_MARKERS,
    payload: {
      isMarkerOpen: markerArray
    }
  })

  return dispatch(dispatchFunc(isMarkerOpen))
}

export function toggleMarker(index) {
  return {
    type: ActionTypes.UPDATE_OPEN_MARKERS,
    payload: {
      index
    }
  }
}

export function adminChangeTableTo(index) {
  return {
    type: ActionTypes.ADMIN_CHANGE_TABLE,
    payload: {
      index
    }
  }
}

export function adminChangeAdminTo(changeTo) {
  return {
    type: ActionTypes.ADMIN_CHANGE_ADMIN,
    payload: {
      changeTo
    }
  }
}

// oauth
export function closeDialog() {
  return {
    type: ActionTypes.CLOSE_DIALOG
  }
}

export function openDialog(message) {
  return {
    type: ActionTypes.OPEN_DIALOG,
    payload: { message }
  }
}

export function authorizeUser() {
  return dispatch => {
    const onSuccess = () => ({
      type: ActionTypes.AUTHORIZED_USER
    })

    return dispatch(
      authorizeOAuth('http://localhost:5000/users/auth/linkedin', {
        integrationName: 'linkedin',
        fetchUser,
        onSuccess
      })
    )
  }
}

export function logoutUser() {
  Cookies.expire('X-User-Email')
  Cookies.expire('X-User-Token')

  const onSuccess = () => ({
    type: ActionTypes.LOGOUT_USER
  })

  return dispatch => {
    dispatch(onSuccess())
    dispatch(openDialog('Logout Successful'))
  }
}
