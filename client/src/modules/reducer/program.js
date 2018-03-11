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
  media: {
    image: {},
    video: {}
  },
  users: [],
  sponsors: [],
  parentOrganizationNames: ''
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_PROGRAM]: requestProgram
}

export default createReducer(initialState, handlers)

function requestProgram(state, data) {
  const { payload: { program } } = data
  const { media, users, parentOrganizationNames } = program

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
    ...program,
    media: {
      image: image || { url: portraitImg },
      video: video || { url: '' }
    },
    users: mediaReducedUsers,
    parentOrganizationNames: parentOrganizationNames.join(', ')
  }
}
