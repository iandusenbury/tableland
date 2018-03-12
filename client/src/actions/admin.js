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

export function fetchUserPermissions() {
  const callDescriptor = {
    endpoint: `/users/current/permissions`,
    types: [
      ActionTypes.REQUEST_USER_PERMISSIONS,
      ActionTypes.RECIEVE_USER_PERMISSIONS,
      ActionTypes.FAILURE_USER_PERMISSIONS
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

export function fetchUserAdminPermissions(id) { // eslint-disable-line
  const callDescriptor = {
    endpoint: `/users/current/permissions`,
    types: [
      ActionTypes.REQUEST_USER_PERMISSIONS,
      ActionTypes.RECIEVE_USER_PERMISSIONS,
      ActionTypes.FAILURE_USER_PERMISSIONS
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

export function revokeAdmin(id) {
  const callDescriptor = {
    body: { role: 'user' },
    endpoint: `/users/${id}`,
    method: 'PUT',
    types: [
      ActionTypes.REQUEST_REVOKE_USER_ADMIN,
      ActionTypes.SUCCESS_REVOKE_USER_ADMIN,
      ActionTypes.FAILURE_REVOKE_USER_ADMIN
    ]
  }

  const onSuccess = (response, dispatch) =>
    dispatch(openDialog(1, { message: 'Success' }))

  return dispatch => dispatch(callApi(callDescriptor, { onSuccess }))
}
