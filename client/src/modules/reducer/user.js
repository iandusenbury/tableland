import { find, propEq, dissoc } from 'ramda'
import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const portraitImg = require('../../assets/images/portrait.png')

const initialState = {
  firstName: '',
  lastName: '',
  role: '',
  visible: true,
  signedIn: false,
  isAdmin: false,
  isSuperAdmin: false,
  media: {
    image: {
      url: ''
    },
    video: {
      url: '',
      id: ''
    }
  },
  experiences: []
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_USER]: requestUser,
  [ActionTypes.LOGOUT_USER]: clearUser,
  [ActionTypes.SUCCESS_CREATE_EXPERIENCE]: updateUser
}

export default createReducer(initialState, handlers)

function requestUser(state, { payload }) {
  const { user } = payload
  const { media } = user

  const image = find(propEq('category', 'image'))(media)
  const video = find(propEq('category', 'video'))(media)

  return {
    ...state,
    ...user,
    media: {
      image: image || { url: portraitImg },
      video: video || { url: '' }
    },
    signedIn: true,
    isAdmin: user.role !== 'user',
    isSuperAdmin: user.role === 'super_admin'
  }
}

function updateUser(state, { payload }) {
  const { experiences } = state
  const { experience } = payload

  const { endDate, startDate } = experience

  const dateifiedEndDate = endDate === null ? null : new Date(endDate)
  const dateifiedStartDate = new Date(startDate)

  const dateifiedExperience = {
    ...experience,
    startDate: dateifiedStartDate,
    endDate: dateifiedEndDate
  }

  return {
    ...state,
    experiences: [...experiences, dissoc('user', dateifiedExperience)]
  }
}

function clearUser() {
  return {
    ...initialState
  }
}
