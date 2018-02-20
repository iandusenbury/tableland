import { combineReducers } from 'redux'

import example from './example'
import user from './user'
import message from './message'
import adminPage from './adminReducer/adminReducer'

export default combineReducers({
  example,
  user,
  message,
  adminPage
})
