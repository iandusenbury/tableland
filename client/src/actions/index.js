import Cookies from 'cookies-js'
import { push } from 'react-router-redux'
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

// Fetch Organization
export function fetchOrganization(orgID) {
  const callDescriptor = {
    endpoint: `/organizations/${orgID}`,
    types: [
      ActionTypes.REQUEST_ORGANIZATION,
      ActionTypes.RECIEVE_ORGANIZATION,
      ActionTypes.FAILURE_ORGANIZATION
    ]
  }

  return dispatch => {
    dispatch(callApi(callDescriptor))
  }
}

// Fetch Professional
// if no argument given, random will be used
export function fetchProfessional(userID = 'random') {
  const callDescriptor = {
    endpoint: `/users/${userID}`,
    types: [
      ActionTypes.REQUEST_PROFESSIONAL,
      ActionTypes.RECIEVE_PROFESSIONAL,
      ActionTypes.FAILURE_PROFESSIONAL
    ]
  }

  return dispatch => {
    dispatch(callApi(callDescriptor))
  }
}

export function fetchResults(values) {
  const { searchKey } = values
  // trim leading and trailing spaces, replace spaces with '+' sign
  const term = searchKey.trim().replace(/ /g, '+')
  const callDescriptor = {
    endpoint: `/search?term=${term}`,
    types: [
      ActionTypes.REQUEST_SEARCH,
      ActionTypes.RECIEVE_SEARCH,
      ActionTypes.FAILURE_SEARCH
    ]
  }
  return dispatch =>
    dispatch(callApi(callDescriptor, { onSuccess: loadResultsPage }))
}

function loadResultsPage(response, dispatch) {
  return dispatch(push('/results'))
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

  return dispatch => {
    dispatch(callApi(callDescriptor, { onSuccess: initMap }))
  }
}

function initMap(response, dispatch) {
  const { payload: { user: { id, experiences } } } = response
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

  const initMarkers = (markerArray, profileID) => ({
    type: ActionTypes.INIT_MAP_INFO,
    payload: {
      isMarkerOpen: markerArray,
      currentProfile: profileID
    }
  })

  return dispatch(initMarkers(isMarkerOpen, id)).then(() => dispatch(push('/')))
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
