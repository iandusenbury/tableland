import { findIndex, propEq, update } from 'ramda'
import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  users: [],
  organizations: [],
  userPermissions: {
    organizations: []
  }
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_ALL_USERS]: getUsers,
  [ActionTypes.RECIEVE_ALL_ORGANIZATIONS]: getOrganizations,
  [ActionTypes.SUCCESS_PATCH_SUPER_ADMIN]: updateUser,
  [ActionTypes.SUCCESS_PATCH_USER_VISIBILITY]: updateUser,
  [ActionTypes.SUCCESS_ORGANIZATION_ADD_ADMIN]: updateUser,
  [ActionTypes.RECIEVE_USER_PERMISSIONS]: getUserPermissions
}

export default createReducer(initialState, handlers)

function getUsers(state, { payload }) {
  const { users } = payload

  return {
    ...state,
    users
  }
}

function getOrganizations(state, { payload }) {
  const { organizations } = payload

  return {
    ...state,
    organizations
  }
}

function updateUser(state, { payload }) {
  const { users } = state
  const { user } = payload
  const index = findIndex(propEq('id', user.id))(users)
  const updatedUsers = update(index, user, users)

  return {
    ...state,
    users: [...updatedUsers]
  }
}

function getUserPermissions(state, { payload }) {
  const { permissions: { organizations } } = payload

  return {
    ...state,
    userPermissions: {
      organizations
    }
  }
}
