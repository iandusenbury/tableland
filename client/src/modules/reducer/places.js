import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  placesData: []
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.PLACES_UPDATE_DATA]: updateData
}

export default createReducer(initialState, handlers)

function updateData(state, { payload }) {
  const { placesData } = payload

  return {
    ...state,
    placesData
  }
}
