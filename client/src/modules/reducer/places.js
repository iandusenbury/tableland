import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  placesData: {},
  placesResults: {},
  searchTexts: {}
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
  const { placesResult, index } = payload
  const { placesResults } = state
  const obj = { ...placesResults }
  obj[index] = placesResult

  return {
    ...state,
    placesResults: obj
  }
}

function updateText(state, { payload }) {
  const { searchText, index } = payload
  const { searchTexts } = state
  const obj = { ...searchTexts }
  obj[index] = searchText

  return {
    ...state,
    searchTexts: obj
  }
}

function updateData(state, { payload }) {
  const { places, index } = payload
  const { placesData } = state
  const obj = { ...placesData }
  obj[index] = places

  return {
    ...state,
    placesData: obj
  }
}
