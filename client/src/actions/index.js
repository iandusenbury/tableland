import ActionTypes from '../constants/actionTypes'
import callApi from '../utils/api'
import { authorizeOAuth } from './oauth'

// fetch User
export function fetchUser() {
  const callDescriptor = {
    endpoint: `/user`,
    types: [
      ActionTypes.REQUEST_USER,
      ActionTypes.RECIEVE_USER,
      ActionTypes.FAILURE_USER
    ]
  }

  return dispatch => {
    dispatch(
      callApi(callDescriptor /* , { onSuccess: oprtionalSuccessCallback } */)
    )
  }
}

// Fetch Professional
export function fetchProfessional(userID) {
  const callDescriptor = {
    endpoint: `/users/${userID}`,
    types: [
      ActionTypes.REQUEST_PROFESSIONAL,
      ActionTypes.RECIEVE_PROFESSIONAL,
      ActionTypes.FAILURE_PROFESSIONAL
    ]
  }

  console.log('userID: ' + userID)
  console.log('endpoint: ' + callDescriptor.endpoint)

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
  return { type: ActionTypes.CLOSE_DIALOG }
}

export function openDialog(dialogId, dialogData) {
  return {
    type: ActionTypes.OPEN_DIALOG,
    payload: { dialogId, dialogData }
  }
}

export function openOAuthDialog(url) {
  return openDialog(ActionTypes.START_OAUTH, { url })
}

export function clearMessage() {
  return { type: ActionTypes.CLEAR_MESSAGE }
}

export function addMessage(message) {
  return {
    type: ActionTypes.ADD_MESSAGE,
    payload: {
      message
    }
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
