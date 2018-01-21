import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  message: 'initial message'
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  // [ActionTypes.MESSAGE_SUCCESS]: requestExample,
  [ActionTypes.RECIEVE_EXAMPLE]: requestExample
}

export default createReducer(initialState, handlers)

function requestExample(state, data) {
  const { payload: { message } } = data
  return {
    ...state,
    message
  }
}
