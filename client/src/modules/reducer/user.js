import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  firstName: '',
  lastName: '',
  role: '',
  visible: true,
  signedIn: false,
  isAdmin: false,
  isSuperAdmin: false
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_USER]: requestUser,
  [ActionTypes.LOGOUT_USER]: clearUser
}

export default createReducer(initialState, handlers)

function requestUser(state, { payload }) {
  const { user } = payload

  return {
    ...state,
    ...user,
    signedIn: true,
    isAdmin: user.role === 'user',
    isSuperAdmin: user.role === 'super admin'
  }
}

function clearUser() {
  return {
    ...initialState
  }
}
