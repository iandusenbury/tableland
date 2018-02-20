import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  firstName: '',
  lastName: ''
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_USER]: requestUser
}

export default createReducer(initialState, handlers)

function requestUser(state, { payload }) {
  const { user } = payload
  return {
    ...state,
    ...user
  }
}
