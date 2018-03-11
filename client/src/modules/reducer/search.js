import React from 'react'
import { find, propEq } from 'ramda'
import BusinessIcon from 'material-ui/svg-icons/communication/business'
import GroupIcon from 'material-ui/svg-icons/social/group'
import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

// Default Avatar images
const userImage = require('../../assets/images/portrait.png')

const orgIcon = <BusinessIcon />
const progIcon = <GroupIcon />

const getDefaultImage = type => {
  if (type === 'Program') return progIcon
  if (type === 'Organization') return orgIcon

  return userImage
}

const initialState = {
  results: []
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_SEARCH]: requestSearch
}

export default createReducer(initialState, handlers)

function requestSearch(state, { payload }) {
  const { results } = payload

  const mediaReducedResults = results.map(result => {
    const { media, type } = result
    const image = find(propEq('category', 'image'))(media)
    return {
      ...result,
      imageUrl: image && image.url ? image.url : getDefaultImage(type)
    }
  })

  return {
    ...state,
    results: mediaReducedResults
  }
}
