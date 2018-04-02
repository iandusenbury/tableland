import Cookies from 'cookies-js'
import { push } from 'react-router-redux'
import ActionTypes from '../constants/actionTypes'
import callApi from '../utils/api'
import { authorizeOAuth } from './oauth'

export function placesClearAll() {
  return {
    type: ActionTypes.PLACES_CLEAR_ALL
  }
}

export function placesUpdateResult(placesResult, index = 0) {
  return {
    type: ActionTypes.PLACES_UPDATE_RESULT,
    payload: {
      placesResult,
      index
    }
  }
}

export function placesUpdateText(searchText, index = 0) {
  return {
    type: ActionTypes.PLACES_UPDATE_TEXT,
    payload: {
      searchText,
      index
    }
  }
}

export function placesUpdateData(places, index = 0) {
  return {
    type: ActionTypes.PLACES_UPDATE_DATA,
    payload: {
      places,
      index
    }
  }
}

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

  return dispatch => dispatch(callApi(callDescriptor))
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
// if no argument given, current will be used
export function fetchProfessional(userID = 'current') {
  const callDescriptor = {
    endpoint: `/users/${userID}`,
    types: [
      ActionTypes.REQUEST_PROFESSIONAL,
      ActionTypes.RECIEVE_PROFESSIONAL,
      ActionTypes.FAILURE_PROFESSIONAL
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

export function fetchProgram(progID) {
  const callDescriptor = {
    endpoint: `/programs/${progID}`,
    types: [
      ActionTypes.REQUEST_PROGRAM,
      ActionTypes.RECIEVE_PROGRAM,
      ActionTypes.FAILURE_PROGRAM
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
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

export function navigateToProfessional(index, users) {
  return dispatch => dispatch(push(`/professional/${users[index[0]].id}`))
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

export function openDialog(id, data) {
  return {
    type: ActionTypes.OPEN_DIALOG,
    payload: { id, data }
  }
}

export function authorizeUser() {
  const windowUrl = window.location.hostname
  const apiUrl =
    windowUrl === 'localhost' ? 'localhost:5000' : window.location.hostname
  const protocol = window.location.protocol // eslint-disable-line
  return dispatch => {
    const onSuccess = () => ({
      type: ActionTypes.AUTHORIZED_USER
    })

    return dispatch(
      authorizeOAuth(`${protocol}//${apiUrl}/users/auth/linkedin`, {
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
  window.open(
    'https://www.linkedin.com/m/logout/',
    'Logout',
    'width=1000 height=800'
  )

  const onSuccess = () => ({
    type: ActionTypes.LOGOUT_USER
  })

  return dispatch =>
    dispatch(onSuccess()).then(() =>
      dispatch(openDialog(1, { message: 'Logout Successful' }))
    )
}

export function initializeApp() {
  const onSuccess = () => ({
    type: ActionTypes.APP_INITIALIZED
  })

  return dispatch =>
    dispatch(fetchUser()).then(() => {
      dispatch(onSuccess())
    })
}

export function updateOrganization(id, info) {
  const callDescriptor = {
    body: { ...info },
    endpoint: `/organizations/${id}`,
    method: 'PUT',
    types: [
      ActionTypes.REQUEST_UPDATE_ORG,
      ActionTypes.SUCCESS_UPDATE_ORG,
      ActionTypes.FAILURE_UPDATE_ORG
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

export function updateOrgVideo(url, orgID, videoId) {
  const body = videoId ? { url } : { medium: { category: 'video', url } }
  const endpoint = videoId
    ? `/organizations/${orgID}/media/${videoId}`
    : `/organizations/${orgID}/media`
  const method = videoId ? 'PUT' : 'POST'
  const callDescriptor = {
    body,
    endpoint,
    method,
    types: [
      ActionTypes.REQUEST_UPDATE_ORG_VIDEO,
      ActionTypes.SUCCESS_UPDATE_ORG_VIDEO,
      ActionTypes.FAILURE_UPDATE_ORG_VIDEO
    ]
  }

  const onSuccess = (response, dispatch) =>
    dispatch(openDialog(1, { message: 'Success' }))

  return dispatch => dispatch(callApi(callDescriptor))
}




/*program stuff */

export function updateProgram(id, info) {
    const callDescriptor = {
        body: { ...info },
        endpoint: `/programs/${id}`,
        method: 'PUT',
        types: [
            ActionTypes.REQUEST_UPDATE_PROGRAM,
            ActionTypes.SUCCESS_UPDATE_PROGRAM,
            ActionTypes.FAILURE_UPDATE_PROGRAM
        ]
    }

    return dispatch => dispatch(callApi(callDescriptor))
}


export function updateProgramVideo(url, progID, videoId) {
    const body = videoId ? { url } : { medium: { category: 'video', url } }
    const endpoint = videoId
        ? `/programs/${progID}/media/${videoId}`
        : `/programs/${progID}/media`
    const method = videoId ? 'PUT' : 'POST'
    const callDescriptor = {
        body,
        endpoint,
        method,
        types: [
            ActionTypes.REQUEST_UPDATE_PROG_VIDEO,
            ActionTypes.SUCCESS_UPDATE_PROG_VIDEO,
            ActionTypes.FAILURE_UPDATE_PROG_VIDEO
        ]
    }

    return dispatch => dispatch(callApi(callDescriptor))
}