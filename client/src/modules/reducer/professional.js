import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'
import { isEmpty } from 'ramda'

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

  const reducedMedia = media.reduce((obj, item) => {
    obj[item.category] = item
    return obj
  }, {});

  if (isEmpty(media)) {
    return {
      ...state,
      ...user,
      media: {
        image: {
          url: portraitImg
        },
        video: {
          url: ''
        }
      }
    }
  }
   
  return {
    ...state,
    ...user,
    media: reducedMedia
  }
}
