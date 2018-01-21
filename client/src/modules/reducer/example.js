import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  message: 'initial message'
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.MESSAGE_SUCCESS]: requestExample
}

export default createReducer(initialState, handlers)

function requestExample(state, { message }) {
  return {
    ...state,
    message
  }
}
