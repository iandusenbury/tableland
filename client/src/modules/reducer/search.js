import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  results: []
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_SEARCH]: requestSearch
}

export default createReducer(initialState, handlers)

function requestSearch(state, { payload }) {
  const { results } = payload

  return {
    ...state,
    results
  }
}
