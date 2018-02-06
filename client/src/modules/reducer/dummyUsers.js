import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  users: []
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_EXAMPLE]: requestExample
}

export default createReducer(initialState, handlers)

function requestExample(state, data) {
  const { payload } = data

  return {
    ...state,
    users: payload
  }
}
