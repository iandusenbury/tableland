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

export function fetchAllOrganizations() {
  const callDescriptor = {
    endpoint: `/organizations`,
    types: [
      ActionTypes.REQUEST_ALL_ORGANIZATIONS,
      ActionTypes.RECIEVE_ALL_ORGANIZATIONS,
      ActionTypes.FAILURE_ALL_ORGANIZATIONS
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
      ActionTypes.REQUEST_PATCH_USER_VISIBILITY,
      ActionTypes.SUCCESS_PATCH_USER_VISIBILITY,
      ActionTypes.FAILURE_PATCH_USER_VISIBILITY
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
      ActionTypes.REQUEST_PATCH_SUPER_ADMIN,
      ActionTypes.SUCCESS_PATCH_SUPER_ADMIN,
      ActionTypes.FAILURE_PATCH_SUPER_ADMIN
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

export function addOrganizationAdmin(id, organizationId) {
  const callDescriptor = {
    body: { admin: { user_id: id } },
    endpoint: `/organizations/${organizationId}/permissions`,
    method: 'POST',
    types: [
      ActionTypes.REQUEST_ORGANIZATION_ADD_ADMIN,
      ActionTypes.SUCCESS_ORGANIZATION_ADD_ADMIN,
      ActionTypes.FAILURE_ORGANIZATION_ADD_ADMIN
    ]
  }

  const onSuccess = (response, dispatch) =>
    dispatch(openDialog(1, { message: 'Success' }))

  return dispatch => dispatch(callApi(callDescriptor, { onSuccess }))
}

// TODO: change 'current' to 'id' when proper endpoint exists
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

// TODO: make post
export function revokeOrganizationAdmin(id) {
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
