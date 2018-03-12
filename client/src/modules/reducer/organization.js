import { find, propEq } from 'ramda'
import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const portraitImg = require('../../assets/images/portrait.png')

const initialState = {
  id: 0,
  type: '',
  name: '',
  description: '',
  url: '',
  category: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  link: '',
  media: {
    image: {},
    video: {}
  },
  users: []
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_ORGANIZATION]: requestOrganization
}

export default createReducer(initialState, handlers)

function requestOrganization(state, data) {
  const { payload: { organization } } = data
  const { media, users } = organization

  const image = find(propEq('category', 'image'))(media)
  const video = find(propEq('category', 'video'))(media)

  const mediaReducedUsers = users.map(user => {
    const { media: userMedia } = user
    const userImage = find(propEq('category', 'image'))(userMedia)
    return {
      ...user,
      imageUrl: userImage && userImage.url ? userImage.url : portraitImg
    }
  })

  return {
    ...state,
    ...organization,
    media: {
      image: image || { url: portraitImg },
      video: video || { url: '' }
    },
    users: mediaReducedUsers
  }
}
