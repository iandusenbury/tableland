import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

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
    image: {},
    video: {}
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
    obj[item.category] = item // eslint-disable-line
    return obj
  }, {})

  return {
    ...state,
    ...user,
    media: reducedMedia
  }
}
