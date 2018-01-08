import createReducer from '../../utils/createReducer'

const initialState = {
  message: 'hello'
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
}

export default createReducer(initialState, handlers)
