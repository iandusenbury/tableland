import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  placesData: [],
  text: ''
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.PLACES_UPDATE_TEXT]: updateText,
  [ActionTypes.PLACES_UPDATE_DATA]: updateData
}

export default createReducer(initialState, handlers)

function updateText(state, data) {
  const { payload: { text } } = data

  return {
    ...state,
    text
  }
}

function updateData(state, { payload }) {
  const { placesData } = payload

  return {
    ...state,
    placesData
  }
}
