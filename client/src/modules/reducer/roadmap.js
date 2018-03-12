import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  isMarkerOpen: [],
  currentMarker: 0,
  isLegendShown: true
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.UPDATE_OPEN_MARKERS]: updateMarkers,
  [ActionTypes.INIT_MAP_INFO]: initMarkers,
  [ActionTypes.TOGGLE_LEGEND]: toggleLegend
}

export default createReducer(initialState, handlers)

function initMarkers(state, data) {
  const { payload: { isMarkerOpen } } = data

  return {
    ...state,
    isMarkerOpen,
    currentMarker: isMarkerOpen.indexOf(true)
  }
}

function updateMarkers(state, data) {
  const { payload: { index } } = data
  const { isMarkerOpen } = state

  for (let i = 0; i < isMarkerOpen.length; i += 1) {
    if (i === index) {
      isMarkerOpen[i] = !isMarkerOpen[i]
    } else {
      isMarkerOpen[i] = false
    }
  }

  return {
    ...state,
    isMarkerOpen,
    currentMarker: index
  }
}

function toggleLegend(state) {
  const { isLegendShown } = state
  return {
    ...state,
    isLegendShown: !isLegendShown
  }
}
