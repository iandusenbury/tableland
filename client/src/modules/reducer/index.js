import { combineReducers } from 'redux'

import example from './example'
import user from './user'
import message from './message'
import adminPage from './adminReducer/adminReducer'
import professionalPage from './professional'

export default combineReducers({
  example,
  user,
  message,
  adminPage,
  professionalPage
})
