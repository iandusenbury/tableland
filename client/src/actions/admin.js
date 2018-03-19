import ActionTypes from '../constants/actionTypes'
import callApi from '../utils/api'
import { openDialog } from './index'

export function fetchAllUsers() {
  const callDescriptor = {
    endpoint: `/users`,
    types: [
      ActionTypes.REQUEST_ALL_USERS,
      ActionTypes.RECIEVE_ALL_USERS,
      ActionTypes.FAILURE_ALL_USERS
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

export function fetchUserPermissions(id) {
  const callDescriptor = {
    endpoint: `/users/${id}/permissions`,
    types: [
      ActionTypes.REQUEST_USER_PERMISSIONS,
      ActionTypes.RECIEVE_USER_PERMISSIONS,
      ActionTypes.FAILURE_USER_PERMISSIONS
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

// type: organizations/programs
export function fetchTypePermissions(type, typeId) {
  const callDescriptor = {
    endpoint: `/${type}/${typeId}/admins`,
    types: [
      ActionTypes.REQUEST_TYPE_PERMISSIONS,
      ActionTypes.RECIEVE_TYPE_PERMISSIONS,
      ActionTypes.FAILURE_TYPE_PERMISSIONS
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

export function toggleUserVisibility(id, visible) {
  const callDescriptor = {
    body: { visible: !visible },
    endpoint: `/users/${id}`,
    method: 'PUT',
    types: [
      ActionTypes.REQUEST_PUT_USER_VISIBILITY,
      ActionTypes.SUCCESS_PUT_USER_VISIBILITY,
      ActionTypes.FAILURE_PUT_USER_VISIBILITY
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

export function toggleOrganizationVisibility(id, visible) {
  const callDescriptor = {
    body: { visible: !visible },
    endpoint: `/organizations/${id}`,
    method: 'PUT',
    types: [
      ActionTypes.REQUEST_PUT_ORGANIZATION_VISIBILITY,
      ActionTypes.SUCCESS_PUT_ORGANIZATION_VISIBILITY,
      ActionTypes.FAILURE_PUT_ORGANIZATION_VISIBILITY
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

export function toggleProgramVisibility(id, visible) {
  const callDescriptor = {
    body: { visible: !visible },
    endpoint: `/programs/${id}`,
    method: 'PUT',
    types: [
      ActionTypes.REQUEST_PUT_PROGRAM_VISIBILITY,
      ActionTypes.SUCCESS_PUT_PROGRAM_VISIBILITY,
      ActionTypes.FAILURE_PUT_PROGRAM_VISIBILITY
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

export function toggleUserSuperAdmin(id, role) {
  const newRole = role === 'super_admin' ? 'user' : 'super_admin'
  const callDescriptor = {
    body: { role: newRole },
    endpoint: `/users/${id}`,
    method: 'PUT',
    types: [
      ActionTypes.REQUEST_PUT_SUPER_ADMIN,
      ActionTypes.SUCCESS_PUT_SUPER_ADMIN,
      ActionTypes.FAILURE_PUT_SUPER_ADMIN
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

export function addAdmin(email, type, typeId) {
  const callDescriptor = {
    body: { email },
    endpoint: `/${type}/${typeId}/permissions`,
    method: 'POST',
    types: [
      ActionTypes.REQUEST_ADD_ADMIN,
      ActionTypes.SUCCESS_ADD_ADMIN,
      ActionTypes.FAILURE_ADD_ADMIN
    ]
  }

  const onSuccess = (response, dispatch) =>
    dispatch(openDialog(1, { message: 'Success' }))

  return dispatch => dispatch(callApi(callDescriptor, { onSuccess }))
}

export function revokeAllUserAdminPermissions(id) {
  const callDescriptor = {
    body: { role: 'user' },
    endpoint: `/users/${id}`,
    method: 'PUT',
    types: [
      ActionTypes.REQUEST_REVOKE_ALL_USER_PERMISSIONS,
      ActionTypes.SUCCESS_REVOKE_ALL_USER_PERMISSIONS,
      ActionTypes.FAILURE_REVOKE_ALL_USER_PERMISSIONS
    ]
  }

  const onSuccess = (response, dispatch) =>
    dispatch(openDialog(1, { message: 'Success' }))

  return dispatch => dispatch(callApi(callDescriptor, { onSuccess }))
}

export function revokeAdmin(userId, type, typeId) {
  const callDescriptor = {
    body: { userId },
    endpoint: `/${type}/${typeId}/revoke`,
    method: 'DELETE',
    types: [
      ActionTypes.REQUEST_REVOKE_ADMIN,
      ActionTypes.SUCCESS_REVOKE_ADMIN,
      ActionTypes.FAILURE_REVOKE_ADMIN
    ]
  }

  const onSuccess = ({ payload }, dispatch, getState) => {
    const { app: { user: { isSuperAdmin } } } = getState()

    if (isSuperAdmin) {
      dispatch({ type: ActionTypes.UPDATE_USER, payload })
    }
    return dispatch(openDialog(1, { message: 'Success' }))
  }

  return dispatch => dispatch(callApi(callDescriptor, { onSuccess }))
}
