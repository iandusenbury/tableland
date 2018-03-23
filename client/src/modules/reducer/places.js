import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  placesData: [],
  placesResult: [],
  searchText: ''
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.PLACES_UPDATE_DATA]: updateData,
  [ActionTypes.PLACES_UPDATE_TEXT]: updateText,
  [ActionTypes.PLACES_UPDATE_RESULT]: updateResult
}

export default createReducer(initialState, handlers)

function updateResult(state, { payload }) {
  const { placesResult } = payload

  return {
    ...state,
    placesResult
  }
}

function updateText(state, { payload }) {
  const { searchText } = payload

  return {
    ...state,
    searchText
  }
}

function updateData(state, { payload }) {
  const { placesData } = payload

  return {
    ...state,
    placesData
  }
}
