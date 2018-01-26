import { combineReducers } from 'redux'

import example from './example'
import currentUser from './selectUser'

export default combineReducers({
  example,
  currentUser
})
