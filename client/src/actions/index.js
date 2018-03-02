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
    dispatch(
      callApi(callDescriptor, { onSuccess: initializeMarkerFlags } )
    )
  }
}

function initializeMarkerFlags(response, dispatch) {
  const { payload: { user: { experiences } } } = response
  let experienceLength = 0
  experiences.forEach(experience => {
    if (experience.organization) {
      experienceLength += 1
    }
  })

  return dispatch(updateMarkerFlags(experienceLength))
}

function updateMarkerFlags(size) {
  const markerFlags = []
  for (let i = 0; i < size - 1; i += 1) {
    markerFlags.push(false)
  }
  markerFlags.push(true)
  return {
    type: ActionTypes.INIT_MARKER_FLAGS,
    payload: {
      markerFlags
    }
  }
}

export function toggleMarkerFlag(index) {
  console.log(index)
  return {
    type: ActionTypes.TOGGLE_MARKER_FLAG,
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
