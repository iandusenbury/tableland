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
    dispatch(
      callApi(callDescriptor)
      )
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
