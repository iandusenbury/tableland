import { findIndex, propEq, update } from 'ramda'
import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  users: [],
  organizations: [],
  programs: [],
  typePermissions: {
    admins: []
  }
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_ALL_USERS]: getUsers,
  [ActionTypes.SUCCESS_PUT_SUPER_ADMIN]: updateUser,
  [ActionTypes.SUCCESS_PUT_USER_VISIBILITY]: updateUser,
  [ActionTypes.SUCCESS_PUT_ORGANIZATION_VISIBILITY]: updateOrganization,
  [ActionTypes.SUCCESS_PUT_PROGRAM_VISIBILITY]: updateProgram,
  [ActionTypes.SUCCESS_ADD_ADMIN]: updateUser,
  [ActionTypes.UPDATE_USER]: updateUser,
  [ActionTypes.SUCCESS_REVOKE_ALL_USER_PERMISSIONS]: updateUser,
  [ActionTypes.RECIEVE_USER_PERMISSIONS]: getUserPermissions,
  [ActionTypes.RECIEVE_TYPE_PERMISSIONS]: getTypePermissions
}

export default createReducer(initialState, handlers)

function getUsers(state, { payload }) {
  const { users } = payload

  return {
    ...state,
    users
  }
}

function getUserPermissions(state, { payload }) {
  const { permissions: { organizations, programs } } = payload

  return {
    ...state,
    organizations,
    programs
  }
}

function getTypePermissions(state, { payload }) {
  const { organization, program } = payload
  const type = organization || program
  const { admins } = type

  return {
    ...state,
    typePermissions: {
      admins
    }
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

function updateOrganization(state, { payload }) {
  const { organizations } = state
  const { organization } = payload
  const index = findIndex(propEq('id', organization.id))(organizations)
  const updatedOrganizations = update(index, organization, organizations)

  return {
    ...state,
    organizations: [...updatedOrganizations]
  }
}

function updateProgram(state, { payload }) {
  const { programs } = state
  const { program } = payload
  const index = findIndex(propEq('id', program.id))(programs)
  const updatedPrograms = update(index, program, programs)

  return {
    ...state,
    programs: [...updatedPrograms]
  }
}
