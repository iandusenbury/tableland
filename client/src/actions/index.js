import Cookies from 'cookies-js'
import { push } from 'react-router-redux'
import ActionTypes from '../constants/actionTypes'
import callApi from '../utils/api'
import { authorizeOAuth } from './oauth'
import { initMap, initUserMap } from './gmap'

export function placesUpdateSearchText(searchText) {
  return {
    type: ActionTypes.PLACES_UPDATE_TEXT,
    payload: {
      searchText
    }
  }
}

export function placesUpdateData(placesData) {
  return {
    type: ActionTypes.PLACES_UPDATE_DATA,
    payload: {
      placesData
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

  return dispatch =>
    dispatch(callApi(callDescriptor, { onSuccess: initUserMap }))
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

  return dispatch => dispatch(callApi(callDescriptor, { onSuccess: initMap }))
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
