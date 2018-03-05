import { find, findIndex, propEq, update, merge } from 'ramda'
import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  users: [],
  organizations: []
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_ALL_USERS]: getUsers,
  [ActionTypes.RECIEVE_ALL_ORGANIZATIONS]: getOrganizations,
  [ActionTypes.TOGGLE_USER_VISIBILITY]: toggleUserVisibility
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

function toggleUserVisibility(state, { id }) {
  const { users } = state
  const user = find(propEq('id', id))(users)
  const index = findIndex(propEq('id', id))(users)
  const updatedUsers = update(
    index,
    merge(user, { visible: !user.visible }),
    users
  )

  return {
    ...state,
    users: [...updatedUsers]
  }
}
