import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  searchKey: 'search key',
  results: []
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_SEARCH]: requestSearch,
  [ActionTypes.UPDATE_SEARCH_KEY]: updateKey
}

export default createReducer(initialState, handlers)

function requestSearch(state, { payload }) {
  const { results } = payload
  // console.log(results)
  return {
    ...state,
    results
  }
}

function updateKey(state, { payload }) {
  const { searchKey } = payload
  // console.log(searchKey)

  return {
    ...state,
    searchKey
  }
}
