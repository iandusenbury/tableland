import ActionTypes from '../constants/actionTypes'
import callApi from '../utils/api'

export function fetchAllUsers() {
  const callDescriptor = {
    endpoint: `/users`,
    types: [
      ActionTypes.REQUEST_ALL_USERS,
      ActionTypes.RECIEVE_ALL_USERS,
      ActionTypes.FAILURE_ALL_USERS
    ]
  }

  return dispatch => {
    dispatch(callApi(callDescriptor))
  }
}

export function fetchAllOrganizations() {
  const callDescriptor = {
    endpoint: `/organizations`,
    types: [
      ActionTypes.REQUEST_ALL_ORGANIZATIONS,
      ActionTypes.RECIEVE_ALL_ORGANIZATIONS,
      ActionTypes.FAILURE_ALL_ORGANIZATIONS
    ]
  }

  return dispatch => {
    dispatch(callApi(callDescriptor))
  }
}

export function toggleUserVisibility(id, visible) {
  const callDescriptor = {
    body: { visible: !visible },
    endpoint: `/users/${id}`,
    method: 'PUT',
    types: [
      ActionTypes.REQUEST_PATCH_USER_VISIBILITY,
      ActionTypes.RECIEVE_PATCH_USER_VISIBILITY,
      ActionTypes.FAILURE_PATCH_USER_VISIBILITY
    ]
  }

  const onSuccess = (response, dispatch) =>
    dispatch({ type: ActionTypes.TOGGLE_USER_VISIBILITY, id })

  return dispatch => dispatch(callApi(callDescriptor, { onSuccess }))
}
