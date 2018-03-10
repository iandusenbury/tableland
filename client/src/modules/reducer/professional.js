import { find, propEq } from 'ramda'
import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const portraitImg = require('../../assets/images/portrait.png')

const initialState = {
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

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_PROFESSIONAL]: requestProfessional
}

export default createReducer(initialState, handlers)

function requestProfessional(state, data) {
  const { payload: { user } } = data
  const { media } = user

  const image = find(propEq('category', 'image'))(media)
  const video = find(propEq('category', 'video'))(media)

  return {
    ...state,
    ...user,
    media: {
      image: image || { url: portraitImg },
      video: video || { url: '' }
    }
  }
}
