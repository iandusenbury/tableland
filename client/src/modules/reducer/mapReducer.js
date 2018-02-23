import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  mapRef: null,
  markers: [],
  polylines: [],
  bounds: {},
  priorityLevel: { job: 0, education: 1, club: 2 }
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.GMAP_BUILD_MAP]: buildRoadMap
}

export default createReducer(initialState, handlers)

function buildRoadMap(state, { payload }) {
  const { markers, polylines, bounds } = payload

  return {
    ...state,
    markers,
    polylines,
    bounds
  }
}
