import { find, propEq } from 'ramda'
import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const portraitImg = require('../../assets/images/portrait.png')

const initialState = {
  isMarkerOpen: [],
  currentMarker: 0,
  isLegendShown: true,
  profile: {
    id: 0,
    type: 'User',
    firstName: '',
    lastName: '',
    description: '',
    contactUrl: '',
    mainTitle: '',
    mainLocation: '',
    role: '',
    link: '',
    media: {
      image: {
        url: ''
      },
      video: {
        url: ''
      }
    },
    experiences: []
  }
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.UPDATE_OPEN_MARKERS]: updateMarkers,
  [ActionTypes.INIT_MAP_INFO]: initMarkers,
  [ActionTypes.TOGGLE_LEGEND]: toggleLegend,
  // [ActionTypes.RECIEVE_USER]: loadProfile,
  [ActionTypes.RECIEVE_PROFESSIONAL]: loadProfile
}

export default createReducer(initialState, handlers)

function loadProfile(state, data) {
  const { payload: { user } } = data
  const { media } = user

  const image = find(propEq('category', 'image'))(media)
  const video = find(propEq('category', 'video'))(media)

  return {
    ...state,
    profile: {
      ...user,
      media: {
        image: image || { url: portraitImg },
        video: video || { url: '' }
      }
    }
  }
}

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
